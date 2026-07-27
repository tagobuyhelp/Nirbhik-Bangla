import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import PostsPage from './pages/PostsPage';
import AddPostPage from './pages/AddPostPage';
import CategoriesPage from './pages/CategoriesPage';
import CreateCategoryPage from './pages/CreateCategoryPage';
import TagsPage from './pages/TagsPage';
import CreateTagPage from './pages/CreateTagPage';
import VideosPage from './pages/VideosPage';
import CreateVideoPage from './pages/CreateVideoPage';
import CreateProgramPage from './pages/CreateProgramPage';
import SchedulePage from './pages/SchedulePage';
import MediaLibraryPage from './pages/MediaLibraryPage';
import UploadMediaPage from './pages/UploadMediaPage';
import AdManagerPage from './pages/AdManagerPage';
import AdPlacementsPage from './pages/AdPlacementsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CreateAdPage from './pages/CreateAdPage';
import CreatePlacementPage from './pages/CreatePlacementPage';
import GoLivePage from './pages/GoLivePage';
import CommentsPage from './pages/CommentsPage';
import LiveStreamsPage from './pages/LiveStreamsPage';
import ReportersPage from './pages/ReportersPage';
import CreateReporterPage from './pages/CreateReporterPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import GenericPage from './pages/GenericPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<AdminLayout />}>
          {/* Main Pages */}
          <Route index element={<DashboardPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/add" element={<AddPostPage />} />

          {/* Content Management Routes */}
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/add" element={<CreateCategoryPage />} />
          <Route path="categories/create" element={<CreateCategoryPage />} />
          <Route path="tags" element={<TagsPage />} />
          <Route path="tags/add" element={<CreateTagPage />} />
          <Route path="tags/create" element={<CreateTagPage />} />
          <Route path="media" element={<MediaLibraryPage />} />
          <Route path="media/upload" element={<UploadMediaPage />} />
          <Route path="pages" element={<GenericPage title="Pages" description="Manage static website pages." />} />
          <Route path="comments" element={<CommentsPage />} />

          {/* Live & Video Routes */}
          <Route path="live-tv" element={<GoLivePage />} />
          <Route path="go-live" element={<GoLivePage />} />
          <Route path="live-streams" element={<LiveStreamsPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="videos/create" element={<CreateVideoPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="schedule/create" element={<CreateProgramPage />} />

          {/* Reporter & Team Routes */}
          <Route path="reporters" element={<ReportersPage />} />
          <Route path="reporters/create" element={<CreateReporterPage />} />

          {/* Advertisement Routes */}
          <Route path="ads-manager" element={<AdManagerPage />} />
          <Route path="ads-manager/create" element={<CreateAdPage />} />
          <Route path="ad-placements" element={<AdPlacementsPage />} />
          <Route path="ad-placements/create" element={<CreatePlacementPage />} />

          {/* Analytics & Settings Routes */}
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="seo-tools" element={<GenericPage title="SEO Tools" description="Manage sitemaps, meta descriptions, and keywords." />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="system-logs" element={<GenericPage title="System Logs" description="View admin activity and system error logs." />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<GenericPage title="404 - Not Found" description="The page you are looking for does not exist." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
