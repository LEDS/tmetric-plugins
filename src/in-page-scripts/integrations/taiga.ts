module Integrations {

    class TaigaIntegration implements WebToolIntegration {

        observeMutations = true;

        matchUrl = '*://taiga.xdevel.com.br/*';

        issueElementSelector = () => [$$.visible('.us-story-main-data')];

        render(issueElement: HTMLElement, linkElement: HTMLElement) {
            let host = $$('tg-detail-header', issueElement);
            if (!host) {
                return;
            }

            let linkContainer = $$.create('div', 'devart-timer-link-taiga');
            linkContainer.appendChild(linkElement);
            host.insertBefore(linkContainer, host.firstElementChild);
        }

        getIssue(issueElement: HTMLElement, source: Source): WebToolIssue {
            // https://taiga.xdevel.com.br/project/PROJECT_NAME/task/NUMBER
            // https://taiga.xdevel.com.br/project/PROJECT_NAME/us/NUMBER
            // https://taiga.xdevel.com.br/project/PROJECT_NAME/issue/NUMBER
            var match = /^(.+)\/(task|us|issue)\/(\d+)$/.exec(source.path);

            if (!match) {
                return;
            }

            // match[3] is a 'NUMBER' from path
            var issueId = match[3];
            if (!issueId) {
                return;
            }

            var issueType = match[2];
            issueId = (issueType == 'task' ? '!' : '#') + issueId

            var issueName = $$.try('span.detail-subject').textContent;
            if (!issueName) {
                return;
            }
            
            var projectName = $$.try('h1 > span.project-name').textContent;

            var serviceType = 'xDevel.taiga';

            var serviceUrl = source.protocol + source.host;

            var issueUrl = source.path;

            return { issueId, issueName, projectName, serviceType, serviceUrl, issueUrl };
        }
    }

    IntegrationService.register(new TaigaIntegration());
}