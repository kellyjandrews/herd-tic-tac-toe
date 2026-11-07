export function GET() {
  return Response.json({
    status: "ok",
    env: process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "development",
    sha: process.env.NEXT_PUBLIC_GIT_SHA ?? "local",
  });
}
