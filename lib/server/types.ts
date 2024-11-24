// types.ts
export interface PluginBlock {
    name: string;
    render: () => JSX.Element; // This should match the render function signature
  }
  