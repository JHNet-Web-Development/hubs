const interactorTransform = [];

/**
 * Applies effects to a hoverer based on hover state.
 * @namespace interactables
 * @component hover-visuals
 */
AFRAME.registerComponent("hover-visuals", {
  schema: {
    hand: { type: "string" },
    controller: { type: "selector" }
  },
  init() {
    // uniforms are set from the component responsible for loading the mesh.
    this.uniforms = null;
  },
  remove() {
    this.uniforms = null;
  },
  tick() {
    if (!this.uniforms || !this.uniforms.size) return;

    this.el.object3D.matrixWorld.toArray(interactorTransform);
    const hovering = this.data.controller.components["super-hands"].state.has("hover-start");

    for (const uniform of this.uniforms.values()) {
      if (this.data.hand === "left") {
        uniform.hubs_HighlightInteractorOne.value = hovering;
        uniform.hubs_InteractorOnePos[0] = interactorTransform[12];
        uniform.hubs_InteractorOnePos[1] = interactorTransform[13];
        uniform.hubs_InteractorOnePos[2] = interactorTransform[14];
      } else {
        uniform.hubs_HighlightInteractorTwo.value = hovering;
        uniform.hubs_InteractorTwoPos[0] = interactorTransform[12];
        uniform.hubs_InteractorTwoPos[1] = interactorTransform[13];
        uniform.hubs_InteractorTwoPos[2] = interactorTransform[14];
      }
    }
  }
});
