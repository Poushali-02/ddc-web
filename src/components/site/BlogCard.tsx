import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export type Blog = {
  title: string;
  snippet: string;
  href: string;
};

const BlogCard = ({ title, snippet, href }: Blog) => {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
      <Card className="glass h-full">
        <CardHeader>
          <CardTitle className="text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-4">
          <p className="text-sm text-muted-foreground">{snippet}</p>
          <div>
            <Button variant="outline" asChild>
              <a href={href}>Read More</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
