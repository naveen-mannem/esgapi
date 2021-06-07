import { ClientRepresentatives } from '.'
import { User } from '../user'

let user, clientRepresentatives

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  clientRepresentatives = await ClientRepresentatives.create({ createdBy: user, userId: 'test', name: 'test', companyId: 'test', authenticationLetterForClientUrl: 'test', companyIdForClient: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = clientRepresentatives.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(clientRepresentatives.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(clientRepresentatives.userId)
    expect(view.name).toBe(clientRepresentatives.name)
    expect(view.companyId).toBe(clientRepresentatives.companyId)
    expect(view.authenticationLetterForClientUrl).toBe(clientRepresentatives.authenticationLetterForClientUrl)
    expect(view.companyIdForClient).toBe(clientRepresentatives.companyIdForClient)
    expect(view.status).toBe(clientRepresentatives.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = clientRepresentatives.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(clientRepresentatives.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(clientRepresentatives.userId)
    expect(view.name).toBe(clientRepresentatives.name)
    expect(view.companyId).toBe(clientRepresentatives.companyId)
    expect(view.authenticationLetterForClientUrl).toBe(clientRepresentatives.authenticationLetterForClientUrl)
    expect(view.companyIdForClient).toBe(clientRepresentatives.companyIdForClient)
    expect(view.status).toBe(clientRepresentatives.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
