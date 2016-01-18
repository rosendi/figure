import { ThunkInterface } from 'redux-thunk';
import { routeActions } from 'redux-simple-router';
import { SubmissionAttrs } from '../../../lib/models/submission.ts';
import * as Firebase from 'firebase';

export const RESET_SUBMISSIONS = 'RESET_SUBMISSIONS';
export const SUBMISSIONS_READY = 'SUBMISSION_READY';
export const SUBMISSION_ADDED = 'SUBMISSION_ADDED';
export const SUBMISSION_CHANGED = 'SUBMISSION_CHANGED';
export const SUBMISSION_MOVED = 'SUBMISSION_MOVED';
export const SUBMISSION_REMOVED = 'SUBMISSION_REMOVED';
export const REMOVE_SUBMISSION_AND_REDIRECT = 'REMOVE_SUBMISSION_AND_REDIRECT';

function submissionsRef(state): Firebase {
  const { firebase, auth } = state;

  return firebase.child('submissions').child(auth.authData.uid);
}

const callbacks = {};

var ref;

export function bindSubmissions(formId: string): ThunkInterface {
  return (dispatch: any, getState: any) => {
    const { firebase } = getState();

    ref = firebase.child('submissions').child(formId);

    callbacks[SUBMISSION_ADDED] = ref.on('child_added', (snapshot: any, prevChild: string) => {
      dispatch({ type: SUBMISSION_ADDED, snapshot: snapshot, prevChild });
    });

    callbacks[SUBMISSION_CHANGED] = ref.on('child_changed', (snapshot: any) => {
      dispatch({ type: SUBMISSION_CHANGED, snapshot: snapshot });
    });

    callbacks[SUBMISSION_MOVED] = ref.on('child_moved', (snapshot: any, prevChild: string) => {
      dispatch({ type: SUBMISSION_MOVED, snapshot: snapshot, prevChild });
    });

    callbacks[SUBMISSION_REMOVED] = ref.on('child_removed', (snapshot: any) => {
      dispatch({ type: SUBMISSION_REMOVED, snapshot: snapshot });
    });

    callbacks[SUBMISSIONS_READY] = ref.once('value', (snapshot: any) => {
      dispatch({ type: SUBMISSIONS_READY });
    });
  };
}

export function unbindSubmissions(): ThunkInterface {
  return (dispatch: any, getState: any) => {
    ref.off('value', callbacks[SUBMISSIONS_READY]);
    ref.off('child_added', callbacks[SUBMISSION_ADDED]);
    ref.off('child_changed', callbacks[SUBMISSION_CHANGED]);
    ref.off('child_moved', callbacks[SUBMISSION_MOVED]);
    ref.off('child_removed', callbacks[SUBMISSION_REMOVED]);

    dispatch({ type: RESET_SUBMISSIONS })
  }
}
