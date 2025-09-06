// 'use client'

// import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs'
// import { dark } from '@clerk/themes'
// import { useTheme } from 'next-themes'

// export function ClerkProvider({ children }: { children: React.ReactNode }) {
//   const { theme } = useTheme()

//   return (
//     <OriginalClerkProvider
//       appearance={{
//         baseTheme: theme === 'dark' ? dark : undefined,
//       }}
//     >
//       {children}
//     </OriginalClerkProvider>
//   )
// }

'use client'
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { ReactNode } from 'react'

export function ClerkProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme()
  
  return (
    <OriginalClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
      }}
    >
      {children}
    </OriginalClerkProvider>
  )
}