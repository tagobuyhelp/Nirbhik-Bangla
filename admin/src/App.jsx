import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import PostsPage from './pages/PostsPage';
import AddPostPage from './pages/AddPostPage';
import CategoriesPage from './pages/CategoriesPage';
import TagsPage from './pages/TagsPage';
import VideosPage from './pages/VideosPage';
import MediaLibraryPage from './pages/MediaLibraryPage';
import AdManagerPage from './pages/AdManagerPage';
import AdPlacementsPage from './pages/AdPlacementsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CreateAdPage from './pages/CreateAdPage';
import GoLivePage from './pages/GoLivePage';
import CommentsPage from './pages/CommentsPage';
import LiveStreamsPage from './pages/LiveStreamsPage';
import GenericPage from './pages/GenericPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          {/* Main Pages */}
          <Route index element={<DashboardPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/add" element={<AddPostPage />} />

          {/* Content Management Routes */}
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="tags" element={<TagsPage />} />
          <Route path="media" element={<MediaLibraryPage />} />
          <Route path="pages" element={<GenericPage title="Pages" description="Manage static website pages." />} />
          <Route path="comments" element={<CommentsPage />} />

          {/* Live & Video Routes */}
          <Route path="live-tv" element={<GoLivePage />} />
          <Route path="go-live" element={<GoLivePage />} />
          <Route path="live-streams" element={<LiveStreamsPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="schedule" element={<GenericPage title="Program Schedule" description="Set up daily broadcast schedule." />} />

          {/* Reporter & Team Routes */}
          <Route path="reporters" element={<GenericPage title="Reporters" description="Manage news reporters and editorial staff." />} />
          <Route path="assignments" element={<GenericPage title="Assignments" description="Track reporting tasks and assignments." />} />
          <Route path="editorial-review" element={<GenericPage title="Editorial Review" description="Review pending news submissions." />} />

          {/* Advertisement Routes */}
          <Route path="ads-manager" element={<AdManagerPage />} />
          <Route path="ads-manager/create" element={<CreateAdPage />} />
          <Route path="ad-placements" element={<AdPlacementsPage />} />

          {/* Analytics & Settings Routes */}
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="seo-tools" element={<GenericPage title="SEO Tools" description="Manage sitemaps, meta descriptions, and keywords." />} />
          <Route path="settings" element={<GenericPage title="Settings" description="Global portal settings and configuration." />} />
          <Route path="system-logs" element={<GenericPage title="System Logs" description="View admin activity and system error logs." />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<GenericPage title="404 - Not Found" description="The page you are looking for does not exist." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
