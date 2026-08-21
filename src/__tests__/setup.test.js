describe("infraestrutura de teste", () => {
  it("roda e tem acesso ao DOM", () => {
    document.body.innerHTML = "<p>ok</p>";
    expect(document.querySelector("p").textContent).toBe("ok");
  });
});
