import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

global.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas en las acciones de Auth', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('login y logout deben de crear la acción respectiva', () => {
    const uid = 'ABC123';
    const displayName = 'Andres';

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test('debe de realizar el logout', async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
      payload: { notes: [], active: null }
    });
  });

  test('debe de iniciar el startLoginEmailPassword', async () => {
    await store.dispatch(startLoginEmailPassword('test@test.com', '123456'));

    const actions = store.getActions();
    // console.log(actions)
    
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: undefined, displayName: undefined
      }
    })
  });
});
