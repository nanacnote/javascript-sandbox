const templateBuilder = require("../../scripts/templateBuilder.lock");
const data = require("../../scripts/typeDocParser.lock");

(function () {
  const context = data();
  const source = `
  <div>
    {{#if classes}}
    <div class="px-1 pb-3 pt-5 h5">CLASSES</div>
    <div id="general-sider-links-default">
      {{#each classes}}
        <button
          class="getting-started-btn btn-lg btn-block btn-no-decoration"
          data-content-ref="class-{{this.name}}"
        >
          {{this.name}}
        </button>
      {{/each}}
    </div>
    {{/if}}
    {{#if functions}}
      <div class="px-1 pb-3 pt-5 h5">FUNCTIONS</div>
      <div id="general-sider-links-default">
        {{#each functions}}
          <button
            class="getting-started-btn btn-lg btn-block btn-no-decoration"
            data-content-ref=function-{{this.name}}
          >
            {{this.name}}
          </button>
        {{/each}}
      </div>
    {{/if}}
    {{#if properties}}
      <div class="px-1 pb-3 pt-5 h5">PROPERTIES</div>
      <div id="general-sider-links-default">
        {{#each properties}}
          <button
            class="getting-started-btn btn-lg btn-block btn-no-decoration"
            data-content-ref=property-{{this.name}}
          >
            {{this.name}}
          </button>
        {{/each}}
      </div>
    {{/if}}
    {{#if methods}}
      <div class="px-1 pb-3 pt-5 h5">METHODS</div>
      <div id="general-sider-links-default">
        {{#each methods}}
          <button
            class="getting-started-btn btn-lg btn-block btn-no-decoration"
            data-content-ref=method-{{this.name}}
          >
            {{this.name}}
          </button>
        {{/each}}
      </div>
    {{/if}}
  </div>
  `;

  templateBuilder(__filename, source, context);
})();
