const { test, expect } = require('@playwright/test');

test('ADFDPW-02: Deve exibir erro ao tentar logar com usuário bloqueado', async ({ page }) => {
  // 1. Acessa o site
  await page.goto('https://www.saucedemo.com/');

  // 2. Preenche com o usuário que sabemos que está bloqueado
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // 3. Clica no botão de login
  await page.click('[data-test="login-button"]');

  // 4. VALIDAÇÃO: O Playwright vai procurar a mensagem de erro na tela
  const erroMensagem = page.locator('[data-test="error"]');
  
  // Aqui dizemos: "Esperamos que o erro contenha o texto de bloqueio"
  await expect(erroMensagem).toContainText('Epic sadface: Sorry, this user has been locked out.');
});