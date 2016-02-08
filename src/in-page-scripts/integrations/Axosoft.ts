﻿module Integrations {

    class Axosoft implements WebToolIntegration {

        observeMutations = true;

        // Workspace task url:
        // https://ACCOUNT_NAME.axosoft.com/*
        matchUrl = '*://*.axosoft.com/*';

        issueElementSelector = '.item-form-body';

        render(issueElement: HTMLElement, linkElement: HTMLElement) {
            var host = $$('.item-field-id', issueElement);
            if (host) {
                linkElement.classList.add('devart-timer-link-axosoft');
                host.parentElement.insertBefore(linkElement, host.nextElementSibling);
            }
        }

        issueTypes = {
            'Bug': 'defects',
            'Feature': 'features',
            'Ticket': 'incidents',
            'Work Item': 'features'
        };

        getIssue(issueElement: HTMLElement, source: Source): WebToolIssue {

            var issueName =
                $$.try<HTMLInputElement>('.item-field-name input', issueElement).value ||
                $$.try('.item-field-name', issueElement).textContent;
            if (!issueName) {
                return;
            }

            var projectNameCell = $$.all('.item-field-table .item-field-row > div', issueElement).filter(div => {
                return $$.try('.item-field-label', div).textContent == 'Project:';
            })[0];
            var projectNameField = projectNameCell && $$('.field', projectNameCell);
            var projectName = projectNameField && (
                $$.try('select option[selected=selected]', projectNameField).textContent || // edit form
                projectNameField.textContent // view form
            );

            var serviceType = 'Axosoft';

            var issueId = $$.try('.item-field-id').textContent;
            var issueType = this.issueTypes[$$.try('.form-subtitle').textContent];

            if (issueId && issueType) {
                var serviceUrl = source.protocol + source.host;
                var issueUrl = 'viewitem?id=' + issueId + '&type=' + issueType;
            }

            return { issueId, issueName, projectName, serviceType, serviceUrl, issueUrl };
        }
    }

    IntegrationService.register(new Axosoft());
}