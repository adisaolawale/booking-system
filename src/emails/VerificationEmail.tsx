import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const COLORS = {
  background: "#f4f3ef",
  card: "#ffffff",
  ink: "#1c2b2a",
  muted: "#6b7a79",
  primary: "#0f4b3f", // your teal, as a plain hex since email clients don't support oklch
  primarySoft: "#e8f2ef",
};

export function VerificationEmail({ pin }: { pin: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your BookEase verification code: {pin}</Preview>
      <Body style={{ backgroundColor: COLORS.background, fontFamily: "Helvetica, Arial, sans-serif" }}>
        <Container
          style={{
            backgroundColor: COLORS.card,
            borderRadius: 16,
            padding: "40px 32px",
            margin: "40px auto",
            maxWidth: 420,
          }}
        >
          <Heading style={{ fontSize: 20, color: COLORS.ink, marginBottom: 8 }}>
            BookEase
          </Heading>

          <Text style={{ fontSize: 15, color: COLORS.ink, marginBottom: 4 }}>
            Here&rsquo;s your verification code:
          </Text>

          <Section
            style={{
              backgroundColor: COLORS.primarySoft,
              borderRadius: 12,
              padding: "18px 0",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: 8,
                color: COLORS.primary,
                fontFamily: "monospace",
                margin: 0,
              }}
            >
              {pin}
            </Text>
          </Section>

          <Text style={{ fontSize: 13, color: COLORS.muted }}>
            This code expires in 10 minutes. If you didn&rsquo;t request this,
            you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}