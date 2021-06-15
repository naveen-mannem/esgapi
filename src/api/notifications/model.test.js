import { Notifications } from '.'

let notifications

beforeEach(async () => {
  notifications = await Notifications.create({ notifyToUser: 'test', notificationType: 'test', content: 'test', notificationTitle: 'test', isRead: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = notifications.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notifications.id)
    expect(view.notifyToUser).toBe(notifications.notifyToUser)
    expect(view.notificationType).toBe(notifications.notificationType)
    expect(view.content).toBe(notifications.content)
    expect(view.notificationTitle).toBe(notifications.notificationTitle)
    expect(view.isRead).toBe(notifications.isRead)
    expect(view.status).toBe(notifications.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = notifications.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notifications.id)
    expect(view.notifyToUser).toBe(notifications.notifyToUser)
    expect(view.notificationType).toBe(notifications.notificationType)
    expect(view.content).toBe(notifications.content)
    expect(view.notificationTitle).toBe(notifications.notificationTitle)
    expect(view.isRead).toBe(notifications.isRead)
    expect(view.status).toBe(notifications.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
