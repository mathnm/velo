import { test, expect } from '@playwright/test';

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  //checkpoint 1: deve estar na página de landing
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //checkpoint 2: deve estar na página de consulta de pedidos
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  await page.getByTestId('search-order-id').click();
  await page.getByTestId('search-order-id').fill('VLO-JKQ87Z');

  //checkpoint 3: deve exibir o pedido aprovado
  await page.getByTestId('search-order-button').click();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-JKQ87Z');
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

});