import AuthForm from "@/components/common/auth-form";
import { Card, CardContent } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[calc(100vh-120px)]">
      <Card>
        <CardContent className="max-w-5xl">
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
}
