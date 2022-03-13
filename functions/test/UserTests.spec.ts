import * as chai from 'chai';
import { assert } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as functions from 'firebase-functions';
import { WrappedFunction } from 'firebase-functions-test/lib/main';

import { PermissionLevel } from '../../src/firebase/Types';
import { initializeTestEnvironment, testEnv } from './Init';
import { ApplicationFlagType, getTestUserPermissionLevel, resetTestDocs, setApplicationFlag, testUserContext, testUserDocRef, updateTransactions } from './Utility';

chai.use(chaiAsPromised);
chai.should();

let myFunctions = null;
let updatePermissionsWrapped: WrappedFunction;

describe("Update Permissions Function Unit Tests", () => {
    before(async () => {
        myFunctions = await initializeTestEnvironment();

        updatePermissionsWrapped = testEnv.wrap(myFunctions.updatePermissions);
    });

    afterEach(async () => {
        await resetTestDocs();
    })

    after(() => {
        testEnv.cleanup();
    });

    describe("None-level caller", () => {
        it("should fail to set a none-level user to none-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onNone.toNone, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set a none-level user to admin-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onNone.toAdmin, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set a none-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);
            await updatePermissionsWrapped(updateTransactions.onNone.toOwner, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set a none-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onNone.toOwner, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an admin-level user to none-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onAdmin.toNone, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an admin-level user to admin-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onAdmin.toAdmin, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an admin-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);
            await updatePermissionsWrapped(updateTransactions.onAdmin.toOwner, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an admin-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onAdmin.toOwner, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to none-level for enabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, true);
            await updatePermissionsWrapped(updateTransactions.onOwner.toNone, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to none-level for disabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, false);
            await updatePermissionsWrapped(updateTransactions.onOwner.toNone, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to admin-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onOwner.toAdmin, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);
            await updatePermissionsWrapped(updateTransactions.onOwner.toOwner, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onOwner.toOwner, testUserContext.none)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });
    });

    describe("Admin-level caller", () => {
        it("should set a none-level user to none-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onNone.toNone, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should set a none-level user to admin-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onNone.toAdmin, testUserContext.admin);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.none);

            assert.equal(permissionLevel, PermissionLevel.Admin);
        });

        it("should fail to set a none-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);
            await updatePermissionsWrapped(updateTransactions.onNone.toOwner, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set a none-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onNone.toOwner, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an admin-level user to none-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onAdmin.toNone, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should set an admin-level user to admin-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onAdmin.toAdmin, testUserContext.admin);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.admin);

            assert.equal(permissionLevel, PermissionLevel.Admin);
        });

        it("should fail to set an admin-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);
            await updatePermissionsWrapped(updateTransactions.onAdmin.toOwner, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an admin-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onAdmin.toOwner, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to none-level for enabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, true);
            await updatePermissionsWrapped(updateTransactions.onOwner.toNone, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to none-level for disabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, false);
            await updatePermissionsWrapped(updateTransactions.onOwner.toNone, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to admin-level for enabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, true);
            await updatePermissionsWrapped(updateTransactions.onOwner.toAdmin, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to admin-level for disabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, false);
            await updatePermissionsWrapped(updateTransactions.onOwner.toAdmin, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);
            await updatePermissionsWrapped(updateTransactions.onOwner.toOwner, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should fail to set an owner-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onOwner.toOwner, testUserContext.admin)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });
    });

    describe("Owner-level caller", () => {
        it("should set a none-level user to none-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onNone.toNone, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.none);

            assert.equal(permissionLevel, PermissionLevel.None);
        });

        it("should set a none-level user to admin-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onNone.toAdmin, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.none);

            assert.equal(permissionLevel, PermissionLevel.Admin);
        });

        it("should set a none-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);

            await updatePermissionsWrapped(updateTransactions.onNone.toOwner, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.none);

            assert.equal(permissionLevel, PermissionLevel.Owner);
        });

        it("should fail to set a none-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onNone.toOwner, testUserContext.owner)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should set an admin-level user to none-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onAdmin.toNone, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.admin);

            assert.equal(permissionLevel, PermissionLevel.None);
        });

        it("should set an admin-level user to admin-level", async () => {
            await updatePermissionsWrapped(updateTransactions.onAdmin.toAdmin, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.admin);

            assert.equal(permissionLevel, PermissionLevel.Admin);
        });

        it("should set an admin-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);

            await updatePermissionsWrapped(updateTransactions.onAdmin.toOwner, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.admin);

            assert.equal(permissionLevel, PermissionLevel.Owner);
        });

        it("should fail to set an admin-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onAdmin.toOwner, testUserContext.owner)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should set an owner-level user to none-level for enabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, true);

            await updatePermissionsWrapped(updateTransactions.onOwner.toNone, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.owner);

            assert.equal(permissionLevel, PermissionLevel.None);
        });

        it("should fail to set an owner-level user to none-level for disabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, false);
            await updatePermissionsWrapped(updateTransactions.onOwner.toNone, testUserContext.owner)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should set an owner-level user to admin-level for enabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, true);

            await updatePermissionsWrapped(updateTransactions.onOwner.toAdmin, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.owner);

            assert.equal(permissionLevel, PermissionLevel.Admin);
        });

        it("should fail to set an owner-level user to admin-level for disabled owner demotion", async () => {
            await setApplicationFlag(ApplicationFlagType.demoteOwner, false);
            await updatePermissionsWrapped(updateTransactions.onOwner.toAdmin, testUserContext.owner)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });

        it("should set an owner-level user to owner-level for enabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, true);

            await updatePermissionsWrapped(updateTransactions.onOwner.toOwner, testUserContext.owner);
            const permissionLevel = await getTestUserPermissionLevel(testUserDocRef.owner);

            assert.equal(permissionLevel, PermissionLevel.Owner);
        });

        it("should fail set an owner-level user to owner-level for disabled owner promotion", async () => {
            await setApplicationFlag(ApplicationFlagType.promoteToOwner, false);
            await updatePermissionsWrapped(updateTransactions.onOwner.toOwner, testUserContext.owner)
                .should.eventually.be.rejectedWith(functions.https.HttpsError);
        });
    });
});