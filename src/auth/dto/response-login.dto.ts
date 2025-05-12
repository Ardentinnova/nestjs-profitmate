import { ApiProperty } from '@nestjs/swagger';
import { User } from '@supabase/supabase-js';

export class LoginResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsImtpZCI6Ik5mci90WmU2WTdIN0J6STAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL21kbXdkdmFvYWlsamZyaW9teXFyLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIwMjA1MTdkMy0wNGM0LTQ1YzMtOTU3OC0yMDMyODlmYjc1ZGIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ0ODU1MjY5LCJpYXQiOjE3NDQ4NTE2NjksImVtYWlsIjoiZWFydGt1YWQ1QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJlYXJ0a3VhZDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMDIwNTE3ZDMtMDRjNC00NWMzLTk1NzgtMjAzMjg5ZmI3NWRiIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDQ4NTE2Njl9XSwic2Vzc2lvbl9pZCI6ImQ5MWVlMmNjLTAxNGItNGU2ZC05MTA3LWRkODRhZWFhN2EzNSIsImlzX2Fub255bW91cyI6ZmFsc2V9.csuNpcq2FeddeR4uMeBEVuKMOe5gJgTXaCM1tRAnJIQ',
  })
  accessToken: string;

  @ApiProperty({
    example: {
      id: '020517d3-04c4-45c3-9578-203289fb75db',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'eartkuad5@gmail.com',
      email_confirmed_at: '2025-04-11T03:33:56.810999Z',
      phone: '',
      confirmed_at: '2025-04-11T03:33:56.810999Z',
      last_sign_in_at: '2025-05-12T01:40:36.38439152Z',
      app_metadata: {
        provider: 'email',
        providers: ['email'],
      },
      user_metadata: {
        email: 'eartkuad5@gmail.com',
        email_verified: true,
        phone_verified: false,
        sub: '020517d3-04c4-45c3-9578-203289fb75db',
      },
      identities: [
        {
          identity_id: '4d35d7a4-c971-4335-bc27-5c7a962a4fce',
          id: '020517d3-04c4-45c3-9578-203289fb75db',
          user_id: '020517d3-04c4-45c3-9578-203289fb75db',
          identity_data: {
            email: 'eartkuad5@gmail.com',
            email_verified: false,
            phone_verified: false,
            sub: '020517d3-04c4-45c3-9578-203289fb75db',
          },
          provider: 'email',
          last_sign_in_at: '2025-04-11T03:33:56.806985Z',
          created_at: '2025-04-11T03:33:56.807036Z',
          updated_at: '2025-04-11T03:33:56.807036Z',
          email: 'eartkuad5@gmail.com',
        },
      ],
      created_at: '2025-04-11T03:33:56.800543Z',
      updated_at: '2025-05-12T01:40:36.397911Z',
      is_anonymous: false,
    },
  })
  user: User;
}
