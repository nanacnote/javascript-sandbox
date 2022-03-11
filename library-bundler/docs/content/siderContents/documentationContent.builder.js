const templateBuilder = require("../../scripts/templateBuilder.lock");
const pkg = require("../../../package.json");
const data = require("../../scripts/typeDocParser.lock");
const hljs = require("highlight.js");

(function () {
  const context = data();

  const source = `
  <div id="documentation-content" class="container-fluid">
    <div class="row">
        <div class="col">
            <div>
                {{#if classes}}
                    <div class="h4 text-secondary">Classes</div>
                    List of all classes and their signatures
                    <hr class="pb-4"/>
                    <div class="pb-5">
                    {{#each classes}}
                        <div id="{{#camel2Kebab}}class-{{this.name}}{{/camel2Kebab}}" class="mb-5">
                            <div class="mb-5">
                                <div class="h5">
                                    {{this.name}}
                                </div>
                                <div>
                                    {{this.children.0.signatures.0.comment.shortText}}
                                </div>
                            </div>
                            <div>
                                {{#if this.children.0.signatures.0.name}}
                                    <div class="mb-5">
                                        <div class="text-secondary mark">Constructor</div>
                                        <div class="px-4">
                                            <strong>{{this.children.0.signatures.0.name}}(</strong>
                                            {{#eachComma this.children.0.signatures.0.parameters}}
                                                <span class="text-primary">{{this.name}}: </span><span>{{this.type.name}}</span>
                                            {{/eachComma}}
                                            <strong>)</strong>
                                        </div>
                                    </div>
                                {{/if}}
                                {{#if this.children.0.signatures.0.parameters}}
                                    <div class="mb-5">
                                        <div class="text-secondary mark">Parameters</div>
                                        <div class="px-4">
                                            <ul>
                                                {{#each this.children.0.signatures.0.parameters}}
                                                    <li>
                                                        <span class="text-primary">{{this.name}} [{{this.type.name}}]: </span>
                                                        <span>
                                                            {{#commentText this.comment}}
                                                                {{this}}
                                                            {{/commentText}}
                                                        </span>
                                                    </li>
                                                {{/each}}
                                            </ul>
                                        </div>
                                    </div>
                                {{/if}}
                                {{#if this.children.0.signatures.0.comment.returns}}
                                    <div class="mb-5">
                                        <div class="text-secondary mark">Returns</div>
                                        <div class="px-4">
                                            {{this.children.0.signatures.0.comment.returns}}
                                        </div>
                                    </div>
                                {{/if}}
                                {{#if this.children.0.signatures.0.comment.tags}}
                                    <div>
                                        <div class="text-secondary mark mb-2">Example</div>
                                        <div>
                                            {{#highlight this.children.0.signatures.0.comment.tags}}
                                                {{{this}}}
                                            {{/highlight}}
                                        </div>
                                    </div>
                                {{/if}}
                                <div class="text-right small">
                                    <a href=${
                                      pkg.homepage + "source-line-incomplete"
                                    }>source [ line: {{this.children.0.sources.0.line}} ]</a>
                                </div>
                            </div>
                        </div>
                    {{/each}}
                    </div>
                {{/if}}
                {{#if functions}}
                    <div class="h4 text-secondary">Functions</div>
                    List of all functions and their signatures
                    <hr class="pb-4"/>
                    <div class="pb-5">
                        {{#each functions}}
                            <div id="{{#camel2Kebab}}function-{{this.name}}{{/camel2Kebab}}" class="mb-5">
                                <div class="mb-5">
                                    <div class="h5">
                                        {{this.name}}
                                    </div>
                                    <div>
                                        {{this.comment.shortText}}
                                    </div>
                                </div>
                                <div>
                                    {{#if this.signatures.0.name}}
                                        <div class="mb-5">
                                            <div class="text-secondary mark">Instance</div>
                                            <div class="px-4">
                                                <strong>{{this.signatures.0.name}}(</strong>
                                                {{#eachComma this.signatures.0.parameters}}
                                                    <span class="text-primary">{{this.name}}: </span>
                                                    <span>
                                                        {{#if this.type.name}}
                                                            {{this.type.name}}
                                                        {{/if}}
                                                        {{#if this.type.types}}
                                                            {{#eachStraightSlash this.type.types}}
                                                                "{{this.value}}"
                                                            {{/eachStraightSlash}}
                                                        {{/if}}
                                                    </span>
                                                {{/eachComma}}
                                                <strong>)</strong>
                                            </div>
                                        </div>
                                    {{/if}}
                                    {{#if this.signatures.0.parameters}}
                                        <div class="mb-5">
                                            <div class="text-secondary mark">Parameters</div>
                                            <div class="px-4">
                                                <ul>
                                                    {{#each this.signatures.0.parameters}}
                                                        <li>
                                                            <span class="text-primary">{{this.name}} [
                                                                {{#if this.type.name}}
                                                                    {{this.type.name}}
                                                                {{/if}}
                                                                {{#if this.type.types}}
                                                                    {{#eachStraightSlash this.type.types}}
                                                                        "{{this.value}}"
                                                                    {{/eachStraightSlash}}
                                                                {{/if}}
                                                            ]: </span>
                                                            <span>
                                                                {{#commentText this.comment}}
                                                                    {{this}}
                                                                {{/commentText}}
                                                            </span>
                                                        </li>
                                                    {{/each}}
                                                </ul>
                                            </div>
                                        </div>
                                    {{/if}}
                                    {{#if this.signatures.0.comment.returns}}
                                        <div class="mb-5">
                                            <div class="text-secondary mark">Returns</div>
                                            <div class="px-4">
                                                {{this.signatures.0.comment.returns}}
                                            </div>
                                        </div>
                                    {{/if}}
                                    {{#if this.signatures.0.comment.tags}}
                                        <div>
                                            <div class="text-secondary mark mb-2">Example</div>
                                            <div>
                                                {{#highlight this.signatures.0.comment.tags}}
                                                    {{{this}}}
                                                {{/highlight}}
                                            </div>
                                        </div>
                                    {{/if}}
                                    <div class="text-right small">
                                        <a href=${
                                          pkg.homepage +
                                          "source-line-incomplete"
                                        }>source [ line: {{this.sources.0.line}} ]</a>
                                    </div>
                                </div>
                            </div>
                        {{/each}}
                        </div>
                    </div>
                {{/if}}
                {{#if properties}}
                    <div class="h4 text-secondary">Properties</div>
                    List of all class properties/attributes
                    <hr class="pb-4"/>
                    <div class="pb-5">
                        {{#each properties}}
                            <div id="{{#camel2Kebab}}property-{{this.name}}{{/camel2Kebab}}" class="pb-5">
                                <div class="h5">
                                    {{this.name}}
                                </div>
                                <div class="text-secondary">
                                    {{this.kind}}
                                </div>
                            </div>
                        {{/each}}
                    </div>
                {{/if}}
                {{#if methods}}
                    <div class="h4 text-secondary">Methods</div>
                    List of all class methods and their signatures
                    <hr class="pb-4"/>
                    <div class="pb-5">
                        {{#each methods}}
                            <div id="{{#camel2Kebab}}method-{{this.name}}{{/camel2Kebab}}" class="pb-5">
                                <div class="h5">
                                    {{this.name}}
                                </div>
                                <div class="text-secondary">
                                    {{this.kind}}
                                </div>
                            </div>
                        {{/each}}
                    </div>
                {{/if}}
            </div>
        </div>
    </div>
  </div>
  `;

  templateBuilder(__filename, source, context);
})();

/* <pre>
  <code>
    ${hljs.highlightAuto('<div id="id" class="hello">Hello World!</div>').value}
  </code>
</pre>; */
