//    Copyright 2017 Andrey Mukamolov <fobo66@protonmail.com>
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

import { SearchIndex } from "algoliasearch";
import { DataSnapshot } from "firebase-functions/lib/providers/database";
import * as sinon from "ts-sinon";

const assert = require('assert');
const functions = require('firebase-functions-test')();

import * as algoliaFirebaseFunctions from '../index';

describe('Algolia Firebase Functions', () => {
  let fakeIndex: sinon.StubbedInstance<SearchIndex>;

  before(() => {
    fakeIndex = sinon.stubInterface<SearchIndex>();
  });

  it('should add new objects from Realtime Database to index', () => {
    const fakeChange = functions.database.exampleDataSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    assert(fakeIndex.saveObjects.called);
  });

  it('should delete Realtime Database object from index', () => {
    const fakeChange = functions.database.exampleDataSnapshotChange();
    fakeChange.after = new DataSnapshot(null)

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    assert(fakeIndex.deleteObject.called);
  });

  it('should add new objects from Firestore to index', () => {
    const fakeChange = functions.firestore.exampleDocumentSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(fakeIndex, fakeChange);

    assert(fakeIndex.saveObjects.called);
  });

  it('should delete Firestore object from index', () => {
    const fakeChange = functions.firestore.exampleDocumentSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(fakeIndex, fakeChange);

    assert(fakeIndex.deleteObject.called);
  });
});
