export const ErrorMessages = {
  jwt: {
    incorrect: {
      message: 'Invalid or expired JWT.',
      field: 'headers.authorization',
    },
    cookiesIncorrect: {
      message: 'Invalid, expired or must be provided JWT in cookies.',
      field: 'request.cookies',
    },
  },
  header: {
    notFound: {
      message: 'Authorization header not found in the request.',
      field: 'client.request.headers.authorization',
    },
  },
  code: {
    incorrect: {
      message: 'Incorrect, expired, or already used confirmation code.',
      field: 'code',
    },
  },
  authentication: {
    loginOrPassInvalid: {
      message: 'Invalid login or password.',
      field: 'headers.authorization',
    },
    noAuthHeadersError: {
      message: 'No authentication headers found.',
      field: 'headers.authorization',
    },
    invalidLoginOrEmailLength: {
      message:
        'Invalid login or email length. Must be between 3 and 50 characters.',
      field: 'loginOrEmail',
    },
    invalidPasswordLength: {
      message: 'Invalid password length. Must be between 6 and 20 characters.',
      field: 'password',
    },
  },
  user: {
    loginOrEmailAlreadyExists: {
      message: 'Login or Email already exists.',
      field: 'field',
    },
    notHavePermission: {
      blog: {
        message: 'You do not have permission. The blog does not belong to you.',
        params: 'blogId',
      },
      forBlog: {
        message:
          'Leaving comments for this user is not allowed, and accessing the blog is restricted.',
        params: 'blogId',
      },
      forPost: {
        message:
          'Leaving posts for this user is not allowed, and accessing the blog is restricted.',
        params: 'blogId',
      },
      subscribeForBlog: {
        message:
          'Subscribe for blog for this user is not allowed, and accessing the blog is restricted.',
        params: 'blogId',
      },
    },
    cannotBlock: {
      ownBlog: {
        message: 'You cannot block your own blog.',
        field: 'id',
      },
      yourself: {
        message: 'You cannot block yourself.',
        field: 'id',
      },
    },
  },
  device: {
    forbiddenDelete: {
      message:
        'Cannot delete a device that does not belong to the current user.',
      params: 'deviceId',
    },
  },
  game: {
    noOpen: {
      message: 'The user has no open, active games.',
      useCase: 'AnswerForCurrentQuestionUseCase',
    },
    answeredAllQuestions: {
      message: 'The user has already answered all of the questions.',
      useCase: 'AnswerForCurrentQuestionUseCase',
    },
    theGameIsOver: {
      message: 'The opponent gave all the answers and 10 seconds passed.',
      useCase: 'AnswerForCurrentQuestionUseCase',
    },
    notFoundChallengeQuestions: {
      message: 'Challenge questions not found for the current game.',
      useCase: 'AnswerForCurrentQuestionUseCase',
    },
  },
  id: {
    formatError: {
      message: 'The ID provided in the parameters is in an incorrect format.',
      params: 'id',
    },
  },
  file: {
    notProvided: {
      message: 'File not provided',
      file: 'file',
    },
    sizeLimit: {
      message: 'File size exceeds the allowed limit. Max 100KB',
      file: 'file.size',
    },
    invalidImageDimensions: {
      message: 'Invalid dimensions maxWidth: 940 and maxHeight: 432',
      file: 'file.dimensions',
    },
    invalidFileExtension: {
      message:
        'Invalid file extension. Allowed extensions are .png, .jpg, .jpeg',
      file: 'file.extension',
    },
  },
};
