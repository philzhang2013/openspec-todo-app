import { test, expect } from '@playwright/test';

test.describe('Todo 应用 E2E 测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('页面应该正确加载', async ({ page }) => {
    await expect(page).toHaveTitle(/vue3-todo-app/);
    await expect(page.getByText('Todo 管理应用')).toBeVisible();
  });

  test('应该能够添加新任务', async ({ page }) => {
    // 输入任务内容
    await page.fill('input[placeholder="添加新任务..."]', '测试任务');

    // 选择优先级
    await page.selectOption('select', 'high');

    // 点击添加按钮
    await page.click('button:has-text("添加")');

    // 验证任务已添加
    await expect(page.getByText('测试任务')).toBeVisible();
    await expect(page.locator('.priority-high')).toBeVisible();
  });

  test('应该能够通过回车键添加任务', async ({ page }) => {
    await page.fill('input[placeholder="添加新任务..."]', '回车添加任务');
    await page.press('input[placeholder="添加新任务..."]', 'Enter');

    await expect(page.getByText('回车添加任务')).toBeVisible();
  });

  test('应该能够标记任务为完成', async ({ page }) => {
    // 先添加一个任务
    await page.fill('input[placeholder="添加新任务..."]', '待完成任务');
    await page.click('button:has-text("添加")');

    // 勾选复选框
    await page.click('input[type="checkbox"]');

    // 验证任务有删除线样式
    const todoItem = page.locator('.todo-item.completed');
    await expect(todoItem).toBeVisible();
  });

  test('应该能够删除任务', async ({ page }) => {
    // 添加一个任务
    await page.fill('input[placeholder="添加新任务..."]', '要删除的任务');
    await page.click('button:has-text("添加")');

    // 验证任务存在
    await expect(page.getByText('要删除的任务')).toBeVisible();

    // 点击删除按钮
    await page.click('.delete-btn:has-text("删除")');

    // 验证任务已删除
    await expect(page.getByText('要删除的任务')).not.toBeVisible();
  });

  test('应该能够添加不同优先级的任务', async ({ page }) => {
    // 添加高优先级任务
    await page.fill('input[placeholder="添加新任务..."]', '高优先级任务');
    await page.selectOption('select', 'high');
    await page.click('button:has-text("添加")');

    // 添加中优先级任务
    await page.fill('input[placeholder="添加新任务..."]', '中优先级任务');
    await page.selectOption('select', 'medium');
    await page.click('button:has-text("添加")');

    // 添加低优先级任务
    await page.fill('input[placeholder="添加新任务..."]', '低优先级任务');
    await page.selectOption('select', 'low');
    await page.click('button:has-text("添加")');

    // 验证所有优先级标签都存在
    await expect(page.locator('.priority-high')).toBeVisible();
    await expect(page.locator('.priority-medium')).toBeVisible();
    await expect(page.locator('.priority-low')).toBeVisible();
  });

  test('应该能够切换主题', async ({ page }) => {
    // 点击主题切换按钮
    const themeSwitchBtn = page.locator('.theme-switch');
    await expect(themeSwitchBtn).toBeVisible();

    // 验证初始状态（light 模式没有 dark class）
    await expect(themeSwitchBtn).not.toHaveClass(/dark/);

    // 点击切换
    await themeSwitchBtn.click();

    // 等待主题切换动画
    await page.waitForTimeout(500);

    // 验证已切换到 dark 模式
    await expect(themeSwitchBtn).toHaveClass(/dark/);

    // 再次点击切换回 light 模式
    await themeSwitchBtn.click();

    // 等待主题切换动画
    await page.waitForTimeout(500);

    // 验证已切回 light 模式
    await expect(themeSwitchBtn).not.toHaveClass(/dark/);
  });

  test('不应该添加空任务', async ({ page }) => {
    // 尝试添加空任务
    await page.fill('input[placeholder="添加新任务..."]', '   ');
    await page.click('button:has-text("添加")');

    // 验证没有空白任务被添加
    const todoItems = page.locator('.todo-item');
    const count = await todoItems.count();
    expect(count).toBe(0);
  });
});
