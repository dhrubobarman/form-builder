import React, { ReactNode, Suspense } from "react";
import { GerFormUserStats, GetForms } from "@/actions/form";
import { LuView } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

const Home = () => {
  return (
    <div className="container p-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense fallback={<FormCardSkeleton count={4} />}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;

const CardStatsWrapper = async () => {
  const stats = await GerFormUserStats();
  return <StatsCards loading={false} data={stats} />;
};

type StatsCardsProps = {
  data?: Awaited<ReturnType<typeof GerFormUserStats>>;
  loading: boolean;
};
const StatsCards = ({ data, loading }: StatsCardsProps) => {
  return (
    <div className="w-full grid pt-8 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<LuView className="text-primary" />}
        helperText={"All time form visits"}
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total submissions"
        icon={<FaWpforms className="text-primary" />}
        helperText={"All time form submissions"}
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-primary"
      />
      <StatsCard
        title="Submission rate"
        icon={<HiCursorClick className="text-primary" />}
        helperText={"Visits that result in form submission"}
        value={data?.submissionRate.toFixed(2) + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-primary" />}
        helperText={"Visits that leave without interacting"}
        value={data?.bounceRate.toFixed(2) + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
};

type StatsCardProps = {
  title: string;
  helperText: string;
  icon: ReactNode;
  value?: string;
  loading: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const StatsCard = ({
  title,
  helperText,
  icon,
  value,
  loading,
  className,
}: StatsCardProps) => {
  return (
    <Card className={`${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className=" opacity-0">0</span>
            </Skeleton>
          ) : (
            value
          )}
          <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const FormCardSkeleton = ({ count }: { count: number }) => {
  const arr = Array.from(Array(count).keys());
  return arr.map((i) => (
    <Skeleton className="border-2 border-primary/20 h-[190px] w-full" key={i} />
  ));
};

const FormCards = async () => {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => {
        return <FormCard key={form.id} form={form} />;
      })}
    </>
  );
};
type FormCardProps = {
  form: Awaited<ReturnType<typeof GetForms>>[number];
};
const FormCard = ({ form }: FormCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className=" truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant={"destructive"}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description provided"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View submission <BiRightArrowAlt />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant={"secondary"}
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/builder/${form.id}`}>
              Edit submission <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
