import { Component } from "../../_Squeleto/ECS/component";

// you can define the incoming types when the component is created
export interface ITemplateComponent {
  someproperty: TemplateType;
}
export type TemplateType = string;

// this is the exported interface that is used in systems modules
export interface TemplateComponent {
  someproperty: TemplateType;
}

// classes should have:
// if UI element, a template property with the peasy-ui template literal
// if no UI aspect to the system, do not define a template
// a 'value' property that will be attached to the entity
export class TemplateComp extends Component {
  // UI template string literal with UI binding of value property
  public template = `
    <style>
      .template-component {}
    </style>
    <template-comp class="template-component">\${value}</template-comp>
    `;

  //setting default value
  public value: TemplateType = "";
  public constructor() {
    //@ts-ignore
    super("foo", TemplateComp, true);
  }

  public define(data: ITemplateComponent): void {
    if (data == null) {
      return;
    }
    this.value = data.someproperty;
  }
}
