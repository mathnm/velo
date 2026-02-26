import { test, expect } from '@playwright/test';

test('deve consultar um pedido aprovado', async ({ page }) => {


  //Test Data
  const order = 'VLO-JKQ87Z';
  
  ///AAA - Arrange, Act, Assert
  //Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  
  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert
  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido$/ }) //expressão regular para verificar se o texto é "Pedido"
    .locator('..');

  await expect(containerPedido).toContainText(order);  
  
  await expect(page.getByText('APROVADO')).toBeVisible();
  await expect(page.locator('#root')).toContainText('APROVADO');


});

test('deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {
  
  //Test Data
  const order = 'VLO-ABC123';

  //Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `);

});