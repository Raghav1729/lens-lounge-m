import { PayloadDto } from '../../../auth/dto/payload.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { SecurityDevicesRepo } from '../../infrastructure/security-devices.repo';
import { SecurityDevicesEntity } from '../../entities/session-devices.entity';
import { ErrorMessages } from '../../../../../../libs/common/src/filters/custom-errors-messages';

export class RemoveDevicesByDeviceIdCommand {
  constructor(
    public deviceId: string,
    public currentPayload: PayloadDto,
  ) {}
}

@CommandHandler(RemoveDevicesByDeviceIdCommand)
export class RemoveDevicesByDeviceIdUseCase
  implements ICommandHandler<RemoveDevicesByDeviceIdCommand>
{
  constructor(protected securityDevicesRepo: SecurityDevicesRepo) {}

  async execute(command: RemoveDevicesByDeviceIdCommand): Promise<boolean> {
    const { deviceId, currentPayload } = command;
    const device: SecurityDevicesEntity[] =
      await this.securityDevicesRepo.findDeviceByDeviceId(deviceId);

    if (device.length === 0) {
      throw new NotFoundException('Device not found');
    }

    if (device[0].user.userId !== currentPayload.userId) {
      throw new HttpException(
        ErrorMessages.device.forbiddenDelete,
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.securityDevicesRepo.deleteDeviceByDeviceId(deviceId);
  }
}
