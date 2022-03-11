const templateBuilder = require("../../scripts/templateBuilder.lock");
const pkg = require("../../../package.json");
const data = require("../data/generalSiderLinks.lock.json");

(function () {
  for (const key in data.contents) {
    const { context } = data.contents[key];
    const source = `
    <div id="{{#camel2Kebab}}{{ref}}{{/camel2Kebab}}" class="container-fluid">
      <div class="row">
        <div class="col">
          <h3>{{header}}</h3>
          <div>{{{innerHTML}}}</div>
        </div>
      </div>
    </div>
    `;

    templateBuilder(
      __filename.replace("allCustomContent.builder", context.ref),
      source,
      context
    );
  }
})();
