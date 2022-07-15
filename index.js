const modal = $.modal({
  title: "Anastasia Modal",
  closable: true,
  content: `
        <p>Lorem ipsum dolor set. </p>
        <p>Lorem ipsum dolor set. </p>`,

  width: "400px",
  footerButtons: [
    {
      text: "Ok",
      type: "primary",
      handler() {
        console.log("Primary btn clicked");
      },
    },
    {
      text: "Cancel",
      type: "danger",
      handler() {
        console.log("Danger btn clicked");
      },
    },
  ],
});
