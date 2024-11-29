"use client";
import Link from "next/link";
import { ArrowRight, Upload, Zap, Code, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function LandingPage() {
  const router = useRouter();
  const auth = useAuth();
  if (auth.isSignedIn) {
    router.push("/project");
  }
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-4">
                  CustomAI
                </h1>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none">
                  Upload, Label, and Infer with Ease
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create your own labeled dataset and get a pre-made API for
                  instant inferences. Streamline your AI workflow today.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => router.push("/sign-up")}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 ">
          <div className="flex items-center flex-col px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
              <Card>
                <CardHeader>
                  <Upload className="h-10 w-10 mb-2" />
                  <CardTitle>Easy Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Quickly upload and organize your labeled data with our
                    intuitive interface.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2" />
                  <CardTitle>Instant API</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get a ready-to-use API for running inferences on your data
                    immediately after upload.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Code className="h-10 w-10 mb-2" />
                  <CardTitle>Flexible Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Easily integrate our API into your existing workflows and
                    applications.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How does the labeling process work?
                </AccordionTrigger>
                <AccordionContent>
                  Our platform provides an intuitive interface for uploading and
                  labeling your data. You can easily assign categories, tags, or
                  annotations to your dataset, which will be used to train the
                  API for inferences.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What types of data can I use with your service?
                </AccordionTrigger>
                <AccordionContent>
                  Our service supports various image data types. We allow you to
                  create your own dataset with label and perform similarity
                  search on the dataset.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How quickly can I start using the API after uploading my data?
                </AccordionTrigger>
                <AccordionContent>
                  Once your labeled data is uploaded and processed, you can
                  start using the API almost immediately. The exact time may
                  vary depending on the size and complexity of your dataset, but
                  typically it's ready within minutes to a few hours.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. All data is
                  encrypted both in transit and at rest. We use
                  industry-standard security protocols and regularly undergo
                  security audits to ensure your data remains protected.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join us and start benefiting from our easy-to-use labeling and
                  inference API platform.
                </p>
              </div>
              <Button
                className="flex items-center"
                onClick={() => router.push("/sign-up")}
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Roshan K.C. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://roshankc.info.np"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://roshankc.info.np"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
