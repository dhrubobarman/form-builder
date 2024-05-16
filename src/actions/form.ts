"use server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "../lib/prisma";
import { FormSchema, formSchema } from "@/schemas/form";

class UserNotFoundErr extends Error {}

const checkUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new UserNotFoundErr();
    }
    return user;
  } catch (error) {
    throw new Error("Something went wrong" + error);
  }
};

export async function GerFormUserStats() {
  const user = await checkUser();
  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;
  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}

export async function CreateForm(data: FormSchema) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Form not valid");
  }
  const user = await checkUser();

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      ...data,
    },
  });
  if (!form) throw new Error("Something went wrong");
  return form.id;
}

export async function GetForms() {
  const user = await checkUser();
  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return forms;
}

export async function GetFormById(id: number) {
  const user = await checkUser();
  const form = await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
  return form;
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await checkUser();
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await checkUser();
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
    },
  });
}

export async function GetFormContentByUrl(url: string) {
  const form = await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: url,
    },
  });

  if (!form) throw new Error("Form not found");
  return form.content;
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: formUrl,
      published: true,
    },
  });
}

export async function GetFormWithSubmissoions(id: number) {
  const user = await checkUser();
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
