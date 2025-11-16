/**
 * 检查试用期是否已过期
 * 试用期截止时间: 2025/11/16 23:32
 */
export function isTrialExpired(): boolean {
  const now = new Date();
  const expiryDate = new Date('2026-06-01T23:59:00');
  
  return now > expiryDate;
}

/**
 * 获取试用期截止时间
 */
export function getTrialExpiryDate(): string {
  return '2026年06月01日 23:59';
}

