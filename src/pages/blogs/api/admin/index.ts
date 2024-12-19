import { supabase } from "@/supabase";

export type Blog = {
  created_at: string;
  description_en: string;
  description_ka: string;
  id: number;
  image_url: string;
  title_en: string;
  title_ka: string;
  user_id: string;
};

export type BlogResponse = {
  id: number;
  title_en: string;
  title_ka: string;
  description_en: string;
  description_ka: string;
  image_url: string;
  created_at: string;
};

export type BlogUpdate = {
  title_en?: string;
  description_en?: string;
  imageUrl?: string;
};

export const getBlogsInAdmin = () => {
  return supabase
    .from("blogs")
    .select("*")
    .throwOnError()
    .then((res) => {
      return res.data as Blog[];
    });
};

export const updateBlogById = async (id: number, updateData: BlogUpdate) => {

  const { data, error } = await supabase
    .from("blogs")
    .update(updateData)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error updating blog:", error);
    throw error;
  }

  return data;
};

export const getSingleBlogInAdmin = async (id: string | number) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }

  return data as BlogResponse;
};

export const createBlog = async (blogData: {
  title_en: string;
  title_ka: string;
  description_en: string;
  description_ka: string;
  image_url: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .insert([blogData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};
