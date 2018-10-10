const sinon = require('sinon');
require('sinon-as-promised');

const objectUnderTest = require('../../../../app/http/controller/usersController');
const userService = require('../../../../app/core/users/userService');

describe('UserController', () => {
  const testSandbox = sinon.sandbox.create();

  afterEach(() => {
    testSandbox.restore();
  });

  describe('#Create()', () => {
    it('should call create w/ expected args', async () => {
      const providedContext = {
        headers: {
          authorization: 'bearer dummyToken',
        },
        request: {
            body : {
                username: 'dummyTaskId',
                password:'dummyTaskId',
                firstName:'dummyTaskId',
                lastName:'dummyTaskId',
                email:'dummyTaskId'
            }
        },
        response: { body : {

        }},
      };

      const userServiceMock = testSandbox.mock(userService);

      userServiceMock.expects('create')
        .withArgs(
          sinon.match(providedContext.request.body),
        ).resolves({});

      /* Act */
      await objectUnderTest.register(providedContext);

      /* Assert */
      userServiceMock.verify();
    });
  });
});
