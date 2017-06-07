declare module Models {

    export const enum Limits {
        maxClientName = 255,
        maxIntegrationUrl = 1024,
        maxTaskRelativeUrl = 256,
        maxIssueId = 128,
        maxIntegrationAccessKey = 255,
        maxIntegrationType = 128,
        maxUserName = 255,
        maxEmail = 128,
        maxProjectName = 255,
        maxAccountName = 128,
        maxTag = 50,
        maxTeamName = 255,
        maxTask = 400
    }

    interface Constants {
        maxTimerHours: number
    }

    interface TimeZoneInfo {
        id: string;
        displayName: string;
    }

    interface UserProfile {
        userProfileId: number;
        activeAccountId: number;
        userName: string;
        dateFormat: string;

        /*
         * Time format for specific user.
         * 'H:mm' - 24h format.
         * 'h:mm a' - 12h format.
         */
        timeFormat: string;
        firstWeekDay: number;
        showBreaks: boolean;
        email: string;
        timeZoneInfo: Models.TimeZoneInfo;

        /*
         * This collection defines which service accounts the user can access.
         * Accounts where user is locked are not included in the list.
         */
        accountMembership: Models.AccountMember[];
        isRegistered: boolean;
    }

    interface Account {
        accountId: number;
        accountName: string;
        accountOwnerName: string;
        isPaid: boolean;
    }

    interface AccountMember {
        accountId: number;
        accountMemberId: number;
        account: Models.Account;
        role: ServiceRole;
        isLocked: boolean;
        userProfile: Models.UserProfile;
    }

    interface IntegratedProjectIdentifier {
        serviceUrl: string;
        serviceType: string;
        projectName: string;
    }

    const enum ProjectRole {
        Member,
        Manager
    }

    const enum ProjectStatus {
        Open = 1,
        Closed = 2,
        Archived = 3
    }

    const enum ServiceRole {
        Member,
        ProjectCreator,
        Admin,
        Owner
    }

    interface IntegratedProjectStatus {
        accountId: number;
        integrationType: string;
        projectStatus: ProjectStatus;
        projectRole: ProjectRole;
        serviceRole: ServiceRole;
    }

    interface WorkTaskLegacy {
        description: string;
        projectId: number;
        externalIssueId: string;
        integrationId: number;
        relativeIssueUrl: string;
        integrationUrl: string;
    }

    export class ProjectTask {
        assigneeId: number;
        budgetSize: number;
        created: string;
        creatorId: number;
        description: string;
        externalIssueId: string;
        integrationId: number;
        integrationUrl: string;
        isBillable: boolean;
        isCompleted: boolean;
        projectTaskId: number;
        projectId: number;
        relativeIssueUrl: string;
        tagsIdentifiers: number[];
    }

    interface TimeEntryDetail {
        description: string;
        projectId: number;
        projectTask: ProjectTask;
    }

    interface Timer {
        isStarted: boolean;
        details: TimeEntryDetail;
        workTask: WorkTaskLegacy;
        startTime: string;
        tagsIdentifiers: number[];
        isBillable: boolean;
    }

    interface TimeEntry {
        timeEntryId: number;
        details: TimeEntryDetail;
        workTask: WorkTaskLegacy;
        startTime: string;
        endTime?: string;
        projectName: string;
        tagsIdentifiers?: number[];
    }

    interface Project {
        projectId: number;
        projectName: string;
        accountId: number;
        projectStatus: ProjectStatus;
        isBillable: boolean;
    }

    interface Tag {
        tagId: number;
        accountId: number;
        tagName: string;
    }
}