// components/MembershipPage.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MembershipContent() {
  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden px-6 py-16">
    
      <Card className="w-full max-w-2xl border-0 bg-transparent shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Interested In Becoming a member?
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-3">
            <div>
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">(Required)</span>
              </Label>
              <Input id="fullName" type="text" />
            </div>

            <div>
              <Label htmlFor="preferredName">
                PreferredName <span className="text-red-500">(Optional)</span>
              </Label>
              <Input id="preferredName" type="text" />
            </div>

            <div>
              <Label htmlFor="pronouns">
                Pronouns <span className="text-red-500">(Optional)</span>
              </Label>
              <Input id="pronouns" type="text" />
            </div>

            <div>
              <Label htmlFor="schoolEmail">
                SchoolEmail <span className="text-red-500">(Required)</span>
              </Label>
              <Input id="schoolEmail" type="email" />
            </div>

            <div>
              <Label htmlFor="preferredEmail">
                PerferredEmail <span className="text-red-500">(Required)</span>
              </Label>
              <Input id="preferredEmail" type="email" />
            </div>

            <div>
              <Label htmlFor="expectedGraduation">
                Expected Graduation Date{" "}
                <span className="text-red-500">(Required)</span>
              </Label>
              <Input id="expectedGraduation" type="text" />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone <span className="text-red-500">(Required)</span>
              </Label>
              <Input id="phone" type="tel" />
            </div>

            <div>
              <Label htmlFor="major">
                Major <span className="text-red-500">(Required)</span>
              </Label>
              <Input id="major" type="text" />
            </div>

            <Button className="mt-3 w-full bg-brand-indigo hover:bg-brand-dark-violet">
              Become Member
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}