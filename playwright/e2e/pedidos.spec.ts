import { test, expect } from '@playwright/test';

test('deve consultar um pedido aprovado', async ({ page }) => {
  
  ///AAA - Arrange, Act, Assert
  //Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  
  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-JKQ87Z');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert
  /*
  await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 30000});
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-JKQ87Z');
  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
  */
  await expect(page.getByText('VLO-JKQ87Z')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-JKQ87Z')).toContainText('VLO-JKQ87Z');
  await expect(page.getByText('APROVADO')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-JKQ87Z')).toContainText('APROVADO');


});