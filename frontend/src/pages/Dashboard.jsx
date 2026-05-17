import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, createPost, addComment as addCommentAPI } from "../services/api";

const kenyaImages = [
  {
    title: "Maasai Mara Sunrise",
    src: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Nairobi City Life",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Coastal Kenya Beach",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
];

function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [commentText, setCommentText] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    
    setLoading(true);
    try {
      const newPost = await createPost({
        title: newTitle.trim(),
        content: newContent.trim(),
      });
      setPosts([newPost, ...posts]);
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddComment = async (postId) => {
    const text = commentText[postId]?.trim();
    if (!text) return;
    
    try {
      const updatedPost = await addCommentAPI(postId, { text });
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          const currentId = post._id || post.id;
          return currentId === postId ? updatedPost : post;
        })
      );
      setCommentText((current) => ({ ...current, [postId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex items-center justify-between rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
          <div>
            <span className="inline-flex items-center rounded-full bg-cyan-100 px-4 py-1 text-sm font-semibold text-cyan-700">Trusted Kenyan health network</span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">AfyaLink Dashboard</h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">Manage appointments, share community posts, and access emergency support with a clean dashboard designed for Kenyan users.</p>
          </div>
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-3xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </section>

        <section className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center p-8 lg:p-10">
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-900 px-4 py-4 text-white shadow-lg">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Secure</p>
                  <p className="mt-3 text-sm leading-6">Safe login and patient data privacy.</p>
                </div>
                <div className="rounded-3xl bg-slate-900 px-4 py-4 text-white shadow-lg">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Fast</p>
                  <p className="mt-3 text-sm leading-6">Quick access to care tools and updates.</p>
                </div>
                <div className="rounded-3xl bg-slate-900 px-4 py-4 text-white shadow-lg">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Modern</p>
                  <p className="mt-3 text-sm leading-6">Responsive experience built for web and mobile.</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                alt="Healthcare team"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent p-6 text-white">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Healthcare in Kenya</p>
                <h2 className="mt-2 text-2xl font-semibold">Connected care for every community.</h2>
              </div>
            </div>
          </div>
        </section>
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80"
              alt="Appointment scheduling"
              className="h-48 w-full rounded-3xl object-cover"
            />
            <h3 className="mt-5 text-xl font-semibold text-slate-900">Easy Appointments</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Book and manage appointments with hospitals and clinics across Kenya.</p>
          </div>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
              alt="Telemedicine session"
              className="h-48 w-full rounded-3xl object-cover"
            />
            <h3 className="mt-5 text-xl font-semibold text-slate-900">Telemedicine</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Connect with doctors online for consultations and follow-up care.</p>
          </div>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1597764699214-c56f65acb45a?auto=format&fit=crop&w=900&q=80"
              alt="Wellness support"
              className="h-48 w-full rounded-3xl object-cover"
            />
            <h3 className="mt-5 text-xl font-semibold text-slate-900">Community Support</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Share updates, ask questions, and comment in a trusted health community.</p>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Your activity</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Create posts and comments that keep your health community active.</p>
              </div>
              <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">Live feed</span>
            </div>

            {user ? (
              <div className="mt-8 space-y-6">
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">Welcome back, {user.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Your posts and comments are saved automatically for easy review.</p>
                </div>

                <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">Create a new post</h3>
                  <form onSubmit={addPost} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Post Title</label>
                      <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                        placeholder="Share a new health update..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Post Content</label>
                      <textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                        rows={4}
                        placeholder="Write something helpful for the community."
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-2xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-700"
                    >
                      Post Update
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-slate-600">
                <p className="text-base">Login to access the dashboard features, share posts, and see the Kenyan highlights.</p>
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-slate-900">Kenyan highlights</h2>
            <div className="mt-5 space-y-4">
              {kenyaImages.map((image) => (
                <div key={image.title} className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{image.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">A visual glimpse of Kenya’s vibrant health and travel culture.</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {user && (
          <section className="space-y-6 rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-slate-900">Community posts</h2>
            <div className="space-y-6">
              {posts.map((post) => {
                const postId = post._id || post.id;
                return (
                  <div key={postId} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                        {post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="mt-4 text-slate-700">{post.content}</p>

                    <div className="mt-5 space-y-4">
                      {post.comments.map((comment) => (
                        <div key={comment._id || comment.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                          <p className="text-slate-700">{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        value={commentText[postId] || ""}
                        onChange={(e) => setCommentText((current) => ({ ...current, [postId]: e.target.value }))}
                        placeholder="Add a comment..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddComment(postId)}
                        className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
