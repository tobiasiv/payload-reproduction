import { Access } from 'payload'

// only admin has access
export const admin = (({ req: { user } }) => user?.role === 'admin') satisfies Access

// any user has access
export const user = (({ req: { user } }) => !!user) satisfies Access

// admin and user self has access
export const userSelf = ((args) => {
  const {
    req: { user, payload },
  } = args

  payload.logger.info(args)

  if (admin(args)) {
    return true
  }

  if (user) {
    const referer = args.req.headers.get('referer')
    let key

    if (referer?.includes('users')) {
      key = 'id'
    }

    if (referer?.includes('children')) {
      key = 'user'
    }

    if (referer?.includes('grand-children')) {
      key = 'child.user'
    }

    if (key) {
      payload.logger.info(key)

      return {
        [key]: {
          equals: user.id,
        },
      }
    }
  }

  return false
}) satisfies Access
