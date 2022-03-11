const templateBuilder = require("../../scripts/templateBuilder.lock");
const data = require("../data/generalSiderLinks.lock.json");

(function () {
  const context = data;
  const source = `
  <div>
    <div class="px-1 pb-3 h5">{{header}}</div>
    <div id="general-sider-links-default">
        {{#each links}}
            <button
                class="getting-started-btn btn-lg btn-block btn-no-decoration"
                data-content-ref="{{this.ref}}"
            >
                {{this.name}}
            </button>
        {{/each}}
    </div>
  </div>
  `;

  templateBuilder(__filename, source, context);
})();
