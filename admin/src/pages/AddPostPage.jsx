import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import {
  Save,
  Eye,
  Rocket,
  Sparkles,
  Wand2,
  Check,
  RotateCw,
  Plus,
  ChevronDown,
  Link as LinkIcon,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  Video,
  Table as TableIcon,
  Code,
  Undo,
  Redo,
  Clock,
  Share2,
  Globe2,
  CheckCircle2,
  FileText,
  Tag,
  FolderTree,
  Send,
  PenTool,
  Heading,
  Maximize2,
  Minimize2,
  Languages,
  SearchCheck,
  ShieldCheck,
  Bot,
  MessageCircle,
  X,
  Upload,
  Calendar,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function AddPostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // 1. Form Core States
  const [activeLang, setActiveLang] = useState('bn');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeywords, setFocusKeywords] = useState([]);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  
  // Multilingual Store
  const [translationsStore, setTranslationsStore] = useState({
    bn: { title: '', content: '', excerpt: '', seoTitle: '', metaDescription: '', focusKeywords: [], tags: [], altText: '', caption: '', credit: '' },
    en: { title: '', content: '', excerpt: '', seoTitle: '', metaDescription: '', focusKeywords: [], tags: [], altText: '', caption: '', credit: '' },
    hi: { title: '', content: '', excerpt: '', seoTitle: '', metaDescription: '', focusKeywords: [], tags: [], altText: '', caption: '', credit: '' }
  });
  const [translatingLang, setTranslatingLang] = useState(null);
  
  // 2. Categories & Tags States
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        const list = data.data || [];
        setCategories(list);
        if (list.length > 0 && !selectedCategory) {
          setSelectedCategory(list[0]._id);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    loadCategories();
  }, []);

  // Fetch article when editing an existing post
  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        setIsAiLoading(true);
        const { data } = await api.get(`/articles/${id}`);
        const art = data.data;
        if (!art) return;

        const bnData = art.translations?.bn || {};
        const enData = art.translations?.en || {};
        const hiData = art.translations?.hi || {};

        const loadedTitle = bnData.title || art.title || '';
        const loadedSlug = bnData.slug || art.slug || '';
        const loadedExcerpt = bnData.excerpt || art.excerpt || '';
        const loadedSeoTitle = bnData.seo?.title || loadedTitle;
        const loadedMetaDesc = bnData.seo?.description || loadedExcerpt;
        const loadedKeywords = bnData.seo?.keywords || [];
        const rawContent = bnData.content || art.content || '';
        const loadedContent = rawContent.replace(/font-size:\s*[^;"]+;?/gi, '');

        setTitle(loadedTitle);
        setSlug(loadedSlug);
        setExcerpt(loadedExcerpt);
        setSeoTitle(loadedSeoTitle);
        setMetaDescription(loadedMetaDesc);
        setFocusKeywords(loadedKeywords);
        if (art.tags && art.tags.length > 0) setTags(art.tags);
        if (art.category?._id) setSelectedCategory(art.category._id);
        const imgUrl = art.featuredImageUrl || art.featuredImage?.url || art.featuredImage || '';
        if (imgUrl) setFeaturedImage(imgUrl);
        if (art.imageMetadata?.altText) setAltText(art.imageMetadata.altText);
        if (art.imageMetadata?.caption) setCaption(art.imageMetadata.caption);
        if (art.imageMetadata?.credit) setCredit(art.imageMetadata.credit);

        if (editorRef.current) {
          editorRef.current.innerHTML = loadedContent || '<p><br></p>';
          if (typeof handleEditorInput === 'function') handleEditorInput();
        }

        setTranslationsStore({
          bn: { title: loadedTitle, content: loadedContent, excerpt: loadedExcerpt, seoTitle: loadedSeoTitle, metaDescription: loadedMetaDesc, focusKeywords: loadedKeywords, tags: bnData.tags || art.tags || [], altText: bnData.imageMetadata?.altText || art.imageMetadata?.altText || '', caption: bnData.imageMetadata?.caption || art.imageMetadata?.caption || '', credit: bnData.imageMetadata?.credit || art.imageMetadata?.credit || '' },
          en: { title: enData.title || '', content: enData.content || '', excerpt: enData.excerpt || '', seoTitle: enData.seo?.title || '', metaDescription: enData.seo?.description || '', focusKeywords: enData.seo?.keywords || [], tags: enData.tags || art.tags || [], altText: enData.imageMetadata?.altText || '', caption: enData.imageMetadata?.caption || '', credit: enData.imageMetadata?.credit || '' },
          hi: { title: hiData.title || '', content: hiData.content || '', excerpt: hiData.excerpt || '', seoTitle: hiData.seo?.title || '', metaDescription: hiData.seo?.description || '', focusKeywords: hiData.seo?.keywords || [], tags: hiData.tags || art.tags || [], altText: hiData.imageMetadata?.altText || '', caption: hiData.imageMetadata?.caption || '', credit: hiData.imageMetadata?.credit || '' }
        });

        showToast('পোস্টের তথ্য সফলভাবে লোড করা হয়েছে!');
      } catch (err) {
        console.error('Failed to fetch article for edit:', err);
        showToast('পোস্ট লোড করতে ব্যর্থ হয়েছে');
      } finally {
        setIsAiLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  // 3. Publish & Social Options States
  const [publishOptions, setPublishOptions] = useState({
    immediately: true,
    allowComments: true,
    showHomepage: true,
    featured: false,
    breaking: false,
    autoShareSocial: true,
  });
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [socialShares, setSocialShares] = useState({
    subscribers: true,
    pushNotification: true,
    facebook: true,
    twitter: true,
  });

  // 4. Social Media Captions State
  const [socialCaptions, setSocialCaptions] = useState({
    facebook: '',
    twitter: '',
    whatsapp: '',
    telegram: '',
  });
  const [editingCaptions, setEditingCaptions] = useState(false);
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);

  // 5. Featured Image State
  const [featuredImage, setFeaturedImage] = useState('');
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [credit, setCredit] = useState('');

  // 6. Toast & Modal Feedback States
  const [toastMessage, setToastMessage] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // 6.3 Draft Save State
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [savedStatusText, setSavedStatusText] = useState('Draft not saved yet');

  // Relative time tracker for saved draft
  useEffect(() => {
    const updateRelativeTime = () => {
      if (!lastSavedTime) {
        setSavedStatusText('Draft not saved yet');
        return;
      }
      const diffMs = Date.now() - lastSavedTime;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);

      if (diffSecs < 10) {
        setSavedStatusText('Draft saved just now');
      } else if (diffSecs < 60) {
        setSavedStatusText(`Draft saved ${diffSecs} seconds ago`);
      } else if (diffMins === 1) {
        setSavedStatusText('Draft saved 1 minute ago');
      } else {
        setSavedStatusText(`Draft saved ${diffMins} minutes ago`);
      }
    };

    updateRelativeTime();
    const interval = setInterval(updateRelativeTime, 5000);
    return () => clearInterval(interval);
  }, [lastSavedTime]);

  // Save Draft Handler
  const handleSaveDraft = () => {
    const editorContent = editorRef.current ? editorRef.current.innerHTML : '';
    const draftData = {
      title,
      slug,
      excerpt,
      seoTitle,
      metaDescription,
      focusKeywords,
      tags,
      content: editorContent,
      savedAt: Date.now()
    };
    try {
      localStorage.setItem('nirbhik_post_draft', JSON.stringify(draftData));
      setLastSavedTime(Date.now());
      showToast('খসড়া (Draft) সফলভাবে সংরক্ষণ করা হয়েছে!');
    } catch (e) {
      showToast('Draft সংরক্ষণ করতে ব্যর্থ হয়েছে');
    }
  };

  // 6.2 AI Title Modal State
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [showTitleModal, setShowTitleModal] = useState(false);

  // 6.5 AI Suggestions State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [loadingAiAction, setLoadingAiAction] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState({
    excerpt: '',
    seoTitle: '',
    metaDescription: '',
    focusKeywords: [],
    tags: [],
    category: ''
  });

  // 7. Editor Interactive State
  const editorRef = useRef(null);
  const imageFileInputRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [activeHeading, setActiveHeading] = useState('p');

  // Show Toast Feedback Message
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Editor Input Listener
  const handleEditorInput = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const chars = text.length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const minutes = Math.max(1, Math.ceil(words / 150));
      setCharCount(chars);
      setWordCount(words);
      setReadingTime(minutes);
    }
  };

  // Execute Formatting Commands
  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Generate AI Title Options
  const handleAiGenerateTitle = async () => {
    const text = editorRef.current ? editorRef.current.innerText : '';
    if (!text || text.trim().length < 50) return showToast('Please write some content first (at least 50 chars)!');
    setIsAiLoading(true);
    showToast('AI-এর মাধ্যমে শিরোনাম সমূহের অপশন তৈরি হচ্ছে...');
    try {
      const res = await api.post('/ai/headlines', { text, lang: activeLang || 'bn' });
      const titles = res.data.data;
      if (Array.isArray(titles) && titles.length > 0) {
        setGeneratedTitles(titles);
        setShowTitleModal(true);
        showToast('AI শিরোনাম সমূহের অপশন তৈরি সম্পন্ন!');
      } else {
        showToast('কোনো শিরোনাম অপশন তৈরি করা যায়নি');
      }
    } catch (err) {
      showToast('শিরোনাম অপশন জেনারেট করতে ব্যর্থ হয়েছে');
    } finally {
      setIsAiLoading(false);
    }
  };

  // User selects an AI Title option from modal
  const handleSelectGeneratedTitle = async (selectedTitle) => {
    setTitle(selectedTitle);
    setShowTitleModal(false);
    showToast('নির্বাচিত শিরোনাম যুক্ত হয়েছে!');
    await handleAiOptimizeSlug(selectedTitle);
    await handleAiRegenerateSidebar('all');
  };

  // Multilingual Tab Switcher with Background AI Auto-Drafting
  const handleSwitchLanguage = async (targetLang) => {
    if (targetLang === activeLang || isAiLoading) return;

    // 1. Save current active language fields into translationsStore
    const currentContent = editorRef.current ? editorRef.current.innerHTML : '';
    const updatedStore = {
      ...translationsStore,
      [activeLang]: {
        title: title,
        content: currentContent,
        excerpt: excerpt,
        seoTitle: seoTitle,
        metaDescription: metaDescription,
        focusKeywords: focusKeywords,
        tags: tags,
        altText: altText,
        caption: caption,
        credit: credit
      }
    };
    setTranslationsStore(updatedStore);

    // 2. Check if target language version already exists in store
    const existing = updatedStore[targetLang];
    if (existing && (existing.title.trim() || existing.content.trim())) {
      setActiveLang(targetLang);
      setTitle(existing.title || '');
      setExcerpt(existing.excerpt || '');
      setSeoTitle(existing.seoTitle || '');
      setMetaDescription(existing.metaDescription || '');
      setFocusKeywords(existing.focusKeywords || []);
      setAltText(existing.altText || '');
      setCaption(existing.caption || '');
      setCredit(existing.credit || 'Nirbhik Bangla Photo');
      if (Array.isArray(existing.tags) && existing.tags.length > 0) {
        setTags(existing.tags);
      }
      if (editorRef.current) {
        editorRef.current.innerHTML = existing.content || '<p><br></p>';
        handleEditorInput();
      }
      setAiSuggestions(prev => ({
        ...prev,
        excerpt: existing.excerpt || prev.excerpt,
        seoTitle: existing.seoTitle || prev.seoTitle,
        metaDescription: existing.metaDescription || prev.metaDescription,
        focusKeywords: existing.focusKeywords || prev.focusKeywords,
        tags: existing.tags || prev.tags
      }));
      showToast(`${targetLang.toUpperCase()} সংস্করণে সুইচ করা হয়েছে!`);
      return;
    }

    // 3. Auto-draft target language via AI translation in background!
    setIsAiLoading(true);
    setTranslatingLang(targetLang);
    const langLabel = targetLang === 'en' ? 'English' : targetLang === 'hi' ? 'Hindi' : targetLang.toUpperCase();
    showToast(`AI-এর মাধ্যমে ${langLabel} ভার্সন তৈরি (Auto-Draft) করা হচ্ছে...`);

    try {
      const sourceTitle = title || updatedStore.bn?.title || '';
      const sourceContentText = editorRef.current ? editorRef.current.innerText : '';
      const sourceContent = sourceContentText || updatedStore.bn?.content || '';
      const sourceExcerpt = excerpt || updatedStore.bn?.excerpt || '';
      const sourceSeoTitle = seoTitle || updatedStore.bn?.seoTitle || '';
      const sourceMetaDesc = metaDescription || updatedStore.bn?.metaDescription || '';
      const sourceKeywordsStr = (focusKeywords.length > 0 ? focusKeywords : updatedStore.bn?.focusKeywords || []).join(', ');
      const sourceTagsStr = (tags.length > 0 ? tags : updatedStore.bn?.tags || []).join(', ');
      const sourceAltText = altText || updatedStore.bn?.altText || '';
      const sourceCaption = caption || updatedStore.bn?.caption || '';

      const [transTitleRes, transContentRes, transExcerptRes, transSeoRes, transMetaRes, transKwRes, transTagsRes, transAltRes, transCapRes] = await Promise.all([
        sourceTitle ? api.post('/ai/translate', { text: sourceTitle, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
        sourceContent ? api.post('/ai/translate', { text: sourceContent, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
        sourceExcerpt ? api.post('/ai/translate', { text: sourceExcerpt, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
        sourceSeoTitle ? api.post('/ai/translate', { text: sourceSeoTitle, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
        sourceMetaDesc ? api.post('/ai/translate', { text: sourceMetaDesc, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
        sourceKeywordsStr ? api.post('/ai/translate', { text: sourceKeywordsStr, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
        sourceTagsStr ? api.post('/ai/translate', { text: sourceTagsStr, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
        sourceAltText ? api.post('/ai/translate', { text: sourceAltText, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
        sourceCaption ? api.post('/ai/translate', { text: sourceCaption, fromLang: activeLang, toLang: targetLang }).catch(() => null) : null,
      ]);

      let translatedContentHtml = transContentRes?.data?.data?.translation || sourceContent;
      if (translatedContentHtml && !translatedContentHtml.includes('<p>')) {
        translatedContentHtml = translatedContentHtml
          .split('\n')
          .filter(p => p.trim())
          .map(p => `<p>${p.trim()}</p>`)
          .join('');
      }

      const translatedKeywords = transKwRes?.data?.data?.translation
        ? transKwRes.data.data.translation.split(',').map(s => s.trim()).filter(Boolean)
        : focusKeywords;

      const translatedTags = transTagsRes?.data?.data?.translation
        ? transTagsRes.data.data.translation.split(',').map(s => s.trim()).filter(Boolean)
        : tags;

      const draftedData = {
        title: transTitleRes?.data?.data?.translation || sourceTitle,
        content: translatedContentHtml,
        excerpt: transExcerptRes?.data?.data?.translation || sourceExcerpt,
        seoTitle: transSeoRes?.data?.data?.translation || sourceSeoTitle,
        metaDescription: transMetaRes?.data?.data?.translation || sourceMetaDesc,
        focusKeywords: translatedKeywords,
        tags: translatedTags,
        altText: transAltRes?.data?.data?.translation || sourceAltText,
        caption: transCapRes?.data?.data?.translation || sourceCaption,
        credit: credit || 'Nirbhik Bangla Photo'
      };

      setTranslationsStore(prev => ({
        ...prev,
        [targetLang]: draftedData
      }));

      setActiveLang(targetLang);
      setTitle(draftedData.title);
      setExcerpt(draftedData.excerpt);
      setSeoTitle(draftedData.seoTitle);
      setMetaDescription(draftedData.metaDescription);
      setFocusKeywords(draftedData.focusKeywords);
      setAltText(draftedData.altText);
      setCaption(draftedData.caption);
      setCredit(draftedData.credit);
      if (draftedData.tags.length > 0) setTags(draftedData.tags);

      if (editorRef.current) {
        editorRef.current.innerHTML = draftedData.content || '<p><br></p>';
        handleEditorInput();
      }

      setAiSuggestions({
        excerpt: draftedData.excerpt,
        seoTitle: draftedData.seoTitle,
        metaDescription: draftedData.metaDescription,
        focusKeywords: draftedData.focusKeywords,
        tags: draftedData.tags,
        category: draftedData.tags[0] || 'সাধারণ'
      });

      showToast(`🎉 ${langLabel} ড্রাফট রেডি!`);
    } catch (err) {
      console.error('Language auto-drafting failed:', err);
      showToast(`${langLabel} ড্রাফট তৈরি করতে ব্যর্থ হয়েছে`);
    } finally {
      setIsAiLoading(false);
      setTranslatingLang(null);
    }
  };

  // Auto Generate / Optimize Slug
  const handleAiOptimizeSlug = async (customTitle = null) => {
    const targetTitle = customTitle || title;
    if (!targetTitle || !targetTitle.trim()) return;
    setIsAiLoading(true);
    showToast('AI-এর মাধ্যমে ইংরেজি স্ল্যাগ তৈরি করা হচ্ছে...');
    try {
      const res = await api.post('/ai/translate', { text: targetTitle, fromLang: 'bn', toLang: 'en' });
      let englishText = res.data?.data?.translation || res.data?.data;
      if (typeof englishText === 'object' && englishText !== null) {
        englishText = englishText.translation || Object.values(englishText)[0];
      }

      let cleanSlug = '';
      if (englishText && typeof englishText === 'string') {
        cleanSlug = englishText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .substring(0, 75);
      }

      if (!cleanSlug || cleanSlug === '-') {
        const sanitized = targetTitle
          .replace(/১৯/g, '19').replace(/২১/g, '21')
          .replace(/[^\x00-\x7F]/g, '')
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
        cleanSlug = sanitized || 'news-' + Date.now().toString().slice(-6);
      }

      setSlug(cleanSlug);
      showToast('ইংরেজি SEO Slug তৈরি সম্পন্ন!');
    } catch (err) {
      console.error('Slug generation failed:', err);
      showToast('স্ল্যাগ তৈরি করতে সমস্যা হয়েছে');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Add / Remove Category
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleAddNewCategory = async () => {
    if (!newCatInput.trim()) return;
    try {
      const res = await api.post('/categories', {
        translations: {
          bn: { name: newCatInput.trim(), slug: newCatInput.trim().toLowerCase().replace(/\s+/g, '-'), description: '' },
          en: { name: newCatInput.trim(), slug: newCatInput.trim().toLowerCase().replace(/\s+/g, '-'), description: '' }
        },
        slug: newCatInput.trim().toLowerCase().replace(/\s+/g, '-'),
        color: '#7C3AED',
        icon: '📁'
      });
      const newCat = res.data.data;
      setCategories(prev => [...prev, newCat]);
      setSelectedCategory(newCat._id);
      setNewCatInput('');
      setShowAddCatModal(false);
      showToast(`নতুন ক্যাটাগরি "${newCatInput.trim()}" যুক্ত হয়েছে!`);
    } catch (err) {
      showToast('Failed to create category');
    }
  };

  // Add / Remove Tags
  const addTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
      showToast('নতুন ট্যাগ যুক্ত করা হয়েছে!');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Apply AI Suggestion directly into form
  const applyAiSuggestion = (type, val) => {
    if (type === 'excerpt') setExcerpt(val);
    if (type === 'seoTitle') setSeoTitle(val);
    if (type === 'metaDescription') setMetaDescription(val);
    showToast(`AI ${type} সফলভাবে পোস্টে যুক্ত করা হয়েছে!`);
  };

  // Handle Image Upload / Change
  const handleFeaturedImageChange = () => {
    if (imageFileInputRef.current) {
      imageFileInputRef.current.click();
    }
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsAiLoading(true);
    showToast('ইমেজ ক্লাউডিনারিতে আপলোড ও প্রসেস (WebP, Auto-Crop) করা হচ্ছে...');

    try {
      const res = await api.post('/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const mediaUrl = res.data?.data?.url || res.data?.data?.secure_url;
      if (mediaUrl) {
        setFeaturedImage(mediaUrl);
        showToast('ইমেজ ক্লাউডিনারিতে WebP আকারে সেভ হয়েছে!');
      } else {
        throw new Error('Cloudinary URL return status failed');
      }
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      const fallbackUrl = URL.createObjectURL(file);
      setFeaturedImage(fallbackUrl);
      showToast('ছবি আপলোড করা হয়েছে (Local Preview)');
    } finally {
      setIsAiLoading(false);
    }
  };

  // AI Regenerate Image Details (Alt Text, Caption, Credit)
  const handleAiRegenerateImageDetails = async () => {
    if (!title) return showToast('Image Details তৈরি করতে খবরের টাইটেল থাকা আবশ্যক!');
    showToast('AI-এর মাধ্যমে ছবির বিবরণ (Alt, Caption, Credit) তৈরি করা হচ্ছে...');
    setIsAiLoading(true);
    try {
      const res = await api.post('/ai/image-alt', { title, excerpt, lang: activeLang || 'bn' });
      const data = res.data?.data;
      if (data) {
        setAltText(data.altText || title);
        setCaption(data.caption || title);
        setCredit(data.credit || 'Nirbhik Bangla Photo');
        showToast('ছবির তথ্য সফলভাবে তৈরি হয়েছে!');
      }
    } catch (err) {
      showToast('ছবির তথ্য তৈরি করতে ব্যর্থ হয়েছে');
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- AI Editor Actions ---
  const handleAiEditorAction = async (actionType) => {
    const text = editorRef.current?.innerText;
    if (!text || text.trim().length < 20) return showToast('Please write some content first to edit!');
    
    setIsAiLoading(true);
    setLoadingAiAction(actionType);
    showToast(`AI is processing (${actionType})...`);
    try {
      const res = await api.post('/ai/editor', { text, actionType });
      const editedText = res.data.data.editedText;
      if (editedText) {
        // Simple implementation: replace all text.
        // In a real robust block editor, we would replace the selected block/text.
        editorRef.current.innerText = editedText;
        handleEditorInput();
        showToast(`AI ${actionType} completed!`);
      }
    } catch (err) {
      showToast(`Failed to ${actionType} text`);
    } finally {
      setIsAiLoading(false);
      setLoadingAiAction(null);
    }
  };

  const handleAiFactCheck = async () => {
    const text = editorRef.current?.innerText;
    if (!text || text.trim().length < 50) return showToast('Not enough content to fact-check!');
    
    setIsAiLoading(true);
    setLoadingAiAction('factcheck');
    showToast('AI is checking facts...');
    try {
      const res = await api.post('/ai/fact-check', { text });
      const { score, flaggedClaims, verdict } = res.data.data;
      if (score < 80 || flaggedClaims.length > 0) {
        alert(`⚠️ AI Fact Check Alert (Score: ${score}/100)\n\nVerdict: ${verdict}\n\nFlagged Claims:\n- ${flaggedClaims.join('\n- ')}`);
      } else {
        showToast(`✅ Fact Check Passed (Score: ${score}/100) - ${verdict}`);
      }
    } catch (err) {
      showToast('Failed to run fact check');
    } finally {
      setIsAiLoading(false);
      setLoadingAiAction(null);
    }
  };

  // --- AI Suggestions Sidebar Handlers ---
  const handleAiRegenerateSidebar = async (type = 'all') => {
    const editorContent = editorRef.current?.innerText || '';
    const text = (title + ' ' + editorContent).trim();
    if (!text || text.length < 10) return showToast('অনুগ্রহ করে টাইটেল বা পোস্ট কন্টেন্ট লিখুন!');
    
    setIsAiLoading(true);
    showToast('AI-এর মাধ্যমে পরামর্শ তৈরি করা হচ্ছে...');
    
    try {
      const updates = {};
      const promises = [];

      if (type === 'all' || type === 'excerpt') {
        promises.push(
          api.post('/ai/summary', { text, lang: activeLang || 'bn' }).then(res => {
            if (res.data?.data?.summary) {
              updates.excerpt = res.data.data.summary;
            }
          }).catch(e => console.warn('AI Summary failed:', e.message))
        );
      }
      
      if (type === 'all' || type === 'seo') {
        promises.push(
          api.post('/ai/seo', { text }).then(res => {
            const data = res.data?.data;
            if (data) {
              if (data.seoTitle) updates.seoTitle = data.seoTitle;
              if (data.seoDescription) updates.metaDescription = data.seoDescription;
              if (Array.isArray(data.keywords)) updates.focusKeywords = data.keywords;
            }
          }).catch(e => console.warn('AI SEO failed:', e.message))
        );
      }

      if (type === 'all' || type === 'tags') {
        promises.push(
          api.post('/ai/suggest-tags', { text, lang: activeLang || 'bn' }).then(res => {
            const tags = res.data?.data?.tags || [];
            if (tags.length > 0) {
              updates.tags = tags;
              updates.category = tags[0];
            }
          }).catch(e => console.warn('AI Tags failed:', e.message))
        );
      }

      await Promise.all(promises);
      
      setAiSuggestions(prev => ({ ...prev, ...updates }));
      showToast(`AI পরামর্শ সফলভাবে আপডেট হয়েছে (${type})!`);
    } catch (err) {
      console.error(err);
      showToast('AI পরামর্শ তৈরি করতে ব্যর্থ হয়েছে');
    } finally {
      setIsAiLoading(false);
      setLoadingAiAction(null);
    }
  };

  const handleGenerateSocialCaptions = async () => {
    if (!title.trim()) {
      showToast('ক্যাপশন তৈরি করার আগে পোস্টের টাইটেল দিন');
      return;
    }
    setIsGeneratingCaptions(true);
    try {
      const res = await api.post('/ai/social-captions', { title, excerpt, lang: activeLang || 'bn' });
      if (res.data?.data) {
        setSocialCaptions(res.data.data);
        showToast('সোশাল মিডিয়া ক্যাপশন সফলভাবে জেনারেট হয়েছে!');
        setEditingCaptions(true); // Open the edit view so they can see them
      }
    } catch (err) {
      console.error(err);
      showToast('ক্যাপশন জেনারেট করতে ব্যর্থ হয়েছে');
    } finally {
      setIsGeneratingCaptions(false);
    }
  };

  // Publish Post Function
  const handlePublishPost = async () => {
    if (!title.trim()) {
      alert('অনুগ্রহ করে পোস্টের টাইটেল প্রদান করুন!');
      return;
    }
    const editorContent = editorRef.current ? editorRef.current.innerHTML : '';
    if (!editorContent || editorContent === '<p><br></p>') {
      alert('অনুগ্রহ করে পোস্টের কন্টেন্ট লিখুন!');
      return;
    }
    const postSlug = slug || title.toLowerCase().replace(/\s+/g, '-');
    
    // Find selected category details
    const selectedCat = categories.find(c => c._id === selectedCategory);
    let catSlug = 'general';
    if (selectedCat) {
      if (typeof selectedCat.slug === 'string') catSlug = selectedCat.slug;
      else if (selectedCat.slug && typeof selectedCat.slug === 'object') catSlug = selectedCat.slug.bn || selectedCat.slug.en || 'general';
      else if (selectedCat.translations?.bn?.slug) catSlug = selectedCat.translations.bn.slug;
    }

    let catName = 'সাধারণ';
    if (selectedCat) {
      if (typeof selectedCat.translations?.bn?.name === 'string') catName = selectedCat.translations.bn.name;
      else if (typeof selectedCat.name === 'string') catName = selectedCat.name;
      else if (selectedCat.name && typeof selectedCat.name === 'object') catName = selectedCat.name.bn || selectedCat.name.en || selectedCat.name.hi || 'সাধারণ';
    }

    // 1. Sync current active language state to store
    const updatedStore = {
      ...translationsStore,
      [activeLang]: {
        title: title,
        content: editorContent,
        excerpt: excerpt,
        seoTitle: seoTitle,
        metaDescription: metaDescription,
        focusKeywords: focusKeywords,
        tags: tags,
        altText: altText,
        caption: caption,
        credit: credit
      }
    };

    // 2. Build multilingual translations payload for MongoDB
    const translationsPayload = {};
    for (const langKey of ['bn', 'en', 'hi']) {
      const data = updatedStore[langKey];
      if (data && (data.title?.trim() || data.content?.trim())) {
        translationsPayload[langKey] = {
          title: data.title || title,
          slug: langKey === 'bn' ? postSlug : `${postSlug}-${langKey}`,
          excerpt: data.excerpt || excerpt,
          content: data.content || editorContent,
          status: 'published',
          tags: (data.tags && data.tags.length > 0) ? data.tags : tags,
          imageMetadata: {
            altText: data.altText || altText,
            caption: data.caption || caption,
            credit: data.credit || credit
          },
          seo: {
            title: data.seoTitle || data.title || title,
            description: data.metaDescription || data.excerpt || excerpt,
            keywords: (data.focusKeywords && data.focusKeywords.length > 0) ? data.focusKeywords : focusKeywords
          }
        };
      }
    }

    setIsPublishing(true);
    try {
      const payload = {
        translations: translationsPayload,
        categorySlug: catSlug,
        categoryName: catName,
        tags: (updatedStore.bn?.tags && updatedStore.bn.tags.length > 0) ? updatedStore.bn.tags : tags,
        featuredImageUrl: featuredImage,
        imageMetadata: {
          altText: altText,
          caption: caption,
          credit: credit
        },
        socialCaptions: socialCaptions,
        isBreaking: publishOptions.breaking,
        isFeatured: publishOptions.featured,
        allowComments: publishOptions.allowComments,
        showOnHomepage: publishOptions.showHomepage,
        autoShareSocial: publishOptions.autoShareSocial,
        stats: {
          wordCount: wordCount,
          charCount: charCount,
          readingTime: readingTime
        }
      };

      if (isEditMode) {
        await api.put(`/articles/${id}`, payload);
        alert('🎉 পোস্টটি সফলভাবে আপডেট (Update) করা হয়েছে!');
      } else {
        await api.post('/articles', payload);
        alert('🎉 পোস্টটি সফলভাবে প্রকাশ (Publish) করা হয়েছে!');
      }
      navigate('/posts');
    } catch (error) {
      alert(error.response?.data?.message || 'পোস্ট সংরক্ষণ করতে ব্যর্থ হয়েছে');
    } finally {
      setIsPublishing(false);
    }
  };

  // Calculate SEO Score dynamically
  const calcSeoScore = () => {
    let score = 0;
    const hasTitle = Boolean((seoTitle || title || aiSuggestions.seoTitle)?.length > 10);
    const hasMeta = Boolean((metaDescription || excerpt || aiSuggestions.metaDescription)?.length > 20);
    const hasKw = Boolean(focusKeywords.length > 0 || (aiSuggestions.focusKeywords && aiSuggestions.focusKeywords.length > 0));
    const hasWordCount = Boolean(wordCount > 50);
    const hasImage = Boolean(featuredImage);
    const hasSlug = Boolean(slug || title);
    const hasTags = Boolean(tags.length > 0 || (aiSuggestions.tags && aiSuggestions.tags.length > 0));

    if (hasTitle) score += 20;
    if (hasMeta) score += 20;
    if (hasKw) score += 15;
    if (hasWordCount) score += 15;
    if (hasImage) score += 15;
    if (hasSlug) score += 7;
    if (hasTags) score += 8;

    return Math.min(100, Math.max(0, score));
  };

  return (
    <div className="space-y-5 text-slate-800 font-sans relative">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-2">
        <NavLink to="/" className="hover:text-[#eb1c24] transition-colors">Dashboard</NavLink>
        <ChevronRight size={12} className="text-slate-400" />
        <NavLink to="/posts" className="hover:text-[#eb1c24] transition-colors">Posts</NavLink>
        <ChevronRight size={12} className="text-slate-400" />
        <span className="text-slate-900 font-bold">{isEditMode ? 'Edit Post' : 'Add New Post'}</span>
      </div>

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{isEditMode ? 'Edit Post' : 'Add New Post'}</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            {isEditMode ? 'Update and refine your news article with AI assistance.' : 'Create engaging content with the power of AI.'}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Status */}
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
            <CheckCircle2 size={14} className={lastSavedTime ? 'text-emerald-600' : 'text-slate-400'} />
            <span className={lastSavedTime ? 'text-emerald-600' : 'text-slate-500'}>{savedStatusText || 'Not saved yet'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleSaveDraft} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer">
              <Save size={14} className="text-slate-500" />
              <span>Save Draft</span>
            </button>
            <button onClick={() => setShowPreviewModal(true)} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer">
              <Eye size={14} className="text-slate-500" />
              <span>Preview</span>
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer">
              <Calendar size={14} className="text-slate-500" />
              <span>Schedule</span>
            </button>
            <div className="relative flex shadow-2xs rounded-lg">
              <button onClick={handlePublishPost} disabled={isPublishing} className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-l-lg flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 border-r border-red-800/30">
                <span>{isPublishing ? 'PUBLISHING...' : 'Publish'}</span>
              </button>
              <button className="bg-[#eb1c24] hover:bg-red-700 text-white px-2.5 rounded-r-lg transition-all cursor-pointer">
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* ================= COLUMN 1: MAIN FORM EDITOR (~66% - xl:col-span-8) ================= */}
        <div className="xl:col-span-8 space-y-6">

          {/* Title & Slug Container */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            
            {/* Title Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Title <span className="text-[#eb1c24]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter news title..."
                  className="w-full h-12 pl-4 pr-44 text-sm md:text-base font-bold text-slate-900 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] transition-all font-bangla"
                />
                <div className="absolute right-2 flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400">
                    {title.length}/100
                  </span>
                  <button
                    onClick={handleAiGenerateTitle}
                    disabled={isAiLoading}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles size={13} className={isAiLoading ? 'animate-spin' : ''} />
                    <span>Generate AI Title</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Slug Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Slug</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-400">
                  {/* Lock icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  className="w-full h-10 pl-9 pr-20 text-xs font-mono font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] transition-all"
                />
                <button
                  onClick={() => handleAiOptimizeSlug()}
                  disabled={isAiLoading}
                  className="absolute right-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* AI Tools & Rich Text Editor Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            {/* AI Tools Toolbar Header */}
            {/* AI Tools Toolbar Header */}
            <div className="bg-white border-b border-slate-100 px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] font-bold text-slate-700">
              <span className="text-slate-900 mr-2 font-extrabold text-xs">AI Tools</span>
              <button onClick={() => handleAiEditorAction('write')} disabled={isAiLoading} className="border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50">
                <PenTool size={13} className={loadingAiAction === 'write' ? 'animate-spin' : ''} /> Write
              </button>
              <button onClick={() => handleAiEditorAction('headlines')} disabled={isAiLoading} className="border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-slate-700">
                <Heading size={13} className={loadingAiAction === 'headlines' ? 'animate-spin' : ''} /> Headlines
              </button>
              <button onClick={() => handleAiEditorAction('rewrite')} disabled={isAiLoading} className="border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-slate-700">
                <RotateCw size={13} className={loadingAiAction === 'rewrite' ? 'animate-spin text-blue-500' : 'text-blue-500'} /> Rewrite
              </button>
              <button onClick={() => handleAiEditorAction('expand')} disabled={isAiLoading} className="border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-slate-700">
                <Maximize2 size={13} className={loadingAiAction === 'expand' ? 'animate-spin text-red-500' : 'text-red-500'} /> Expand
              </button>
              <button onClick={() => handleAiEditorAction('shorten')} disabled={isAiLoading} className="border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-slate-700">
                <Minimize2 size={13} className={loadingAiAction === 'shorten' ? 'animate-spin text-emerald-600' : 'text-emerald-600'} /> Shorten
              </button>
              <button onClick={async () => {
                const text = editorRef.current?.innerText;
                if (!text || text.trim().length < 20) return showToast('Please write some content first!');
                setIsAiLoading(true);
                setLoadingAiAction('translate');
                showToast('AI translating to English...');
                try {
                  const res = await api.post('/ai/translate', { text, fromLang: 'bn', toLang: 'en' });
                  if (res.data.data.translation) {
                    editorRef.current.innerText = res.data.data.translation;
                    handleEditorInput();
                    showToast('Content translated to English!');
                  }
                } catch (err) { showToast('Translation failed'); }
                finally { setIsAiLoading(false); setLoadingAiAction(null); }
              }} disabled={isAiLoading} className="border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-slate-700">
                <Languages size={13} className={loadingAiAction === 'translate' ? 'animate-spin text-blue-600' : 'text-blue-600'} /> Translate
              </button>
              <button onClick={() => handleAiRegenerateSidebar('seo')} disabled={isAiLoading} className="border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-slate-700">
                <SearchCheck size={13} className="text-teal-600" /> SEO
              </button>
              <button onClick={handleAiFactCheck} disabled={isAiLoading} className="border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ml-auto">
                <ShieldCheck size={13} /> Fact Check
              </button>
            </div>

            {/* Standard Editor Formatting Toolbar */}
            <div className="border-b border-slate-200 px-3 py-2 flex items-center gap-1 flex-wrap bg-slate-50/50 text-slate-600 text-xs">
              <select
                value={activeHeading}
                onChange={(e) => {
                  setActiveHeading(e.target.value);
                  execCmd('formatBlock', e.target.value);
                }}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
              </select>
              <div className="h-4 w-px bg-slate-300 mx-1" />
              <button onClick={() => execCmd('bold')} className="p-1.5 hover:bg-slate-200 rounded font-black cursor-pointer" title="Bold"><Bold size={15} /></button>
              <button onClick={() => execCmd('italic')} className="p-1.5 hover:bg-slate-200 rounded italic cursor-pointer" title="Italic"><Italic size={15} /></button>
              <button onClick={() => execCmd('underline')} className="p-1.5 hover:bg-slate-200 rounded underline cursor-pointer" title="Underline"><Underline size={15} /></button>
              <button onClick={() => execCmd('strikeThrough')} className="p-1.5 hover:bg-slate-200 rounded line-through cursor-pointer" title="Strikethrough"><Strikethrough size={15} /></button>
              <button onClick={() => execCmd('formatBlock', 'blockquote')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Quote"><Quote size={15} /></button>
              <div className="h-4 w-px bg-slate-300 mx-1" />
              <button onClick={() => execCmd('insertUnorderedList')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Bullet List"><List size={15} /></button>
              <button onClick={() => execCmd('insertOrderedList')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Numbered List"><ListOrdered size={15} /></button>
              <div className="h-4 w-px bg-slate-300 mx-1" />
              <button onClick={() => execCmd('justifyLeft')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Align Left"><AlignLeft size={15} /></button>
              <button onClick={() => execCmd('justifyCenter')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Align Center"><AlignCenter size={15} /></button>
              <button onClick={() => execCmd('justifyRight')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Align Right"><AlignRight size={15} /></button>
              <button onClick={() => execCmd('justifyFull')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Justify"><AlignJustify size={15} /></button>
              <div className="h-4 w-px bg-slate-300 mx-1" />
              <button onClick={() => { const url = prompt('ইউআরএল লিংক প্রদান করুন:'); if (url) execCmd('createLink', url); }} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Insert Link"><LinkIcon size={15} /></button>
              <button onClick={() => { const url = prompt('ইমেজ ইউআরএল লিংক প্রদান করুন:'); if (url) execCmd('insertImage', url); }} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Insert Image"><ImageIcon size={15} /></button>
              <button onClick={() => execCmd('undo')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Undo"><Undo size={15} /></button>
              <button onClick={() => execCmd('redo')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Redo"><Redo size={15} /></button>
            </div>

            {/* Original Interactive WYSIWYG Editor Canvas */}
            <div className="editor-content p-5 text-sm leading-relaxed text-slate-800 font-bangla min-h-[320px]">
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="outline-none min-h-[300px] space-y-4"
                suppressContentEditableWarning
              >
                <p><br /></p>
              </div>
            </div>

            {/* Editor Status Footer */}
            <div className="border-t border-slate-100 px-4 py-2.5 bg-white flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <div className="flex items-center gap-4">
                <span>Words: <strong className="text-slate-800">{wordCount}</strong></span>
                <span>Characters: <strong className="text-slate-800">{charCount}</strong></span>
                <span className="flex items-center gap-1"><Clock size={13} className="text-slate-400" /> Reading Time: <strong className="text-slate-800">{readingTime} min</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-600">Excellent</span>
              </div>
            </div>
          </div>

          {/* Excerpt Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Post Excerpt (সংক্ষেপ)
              </label>
            </div>
            <div className="relative">
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write brief news summary (Excerpt) or accept from AI Suggestions..."
                rows={4}
                className="w-full p-4 pb-10 text-sm font-bangla text-slate-800 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all resize-none shadow-sm"
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 px-2">
                  {excerpt.length}/300
                </span>
                <button
                  onClick={() => handleAiRegenerateSidebar('excerpt')}
                  disabled={isAiLoading}
                  className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Sparkles size={13} className={isAiLoading ? 'animate-spin' : ''} />
                  <span>Generate Excerpt</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2-Column Split Grid (SEO & Categories/Tags) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SEO Settings */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">SEO Settings</h4>
              <div className="space-y-3">
                {/* SEO Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700">SEO Title</label>
                    <span className="text-[10px] font-bold text-slate-400">{seoTitle.length}/60</span>
                  </div>
                  <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="w-full px-3 py-2 text-xs font-bangla text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] transition-all" />
                </div>
                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700">Meta Description</label>
                    <span className="text-[10px] font-bold text-slate-400">{metaDescription.length}/160</span>
                  </div>
                  <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} className="w-full px-3 py-2 text-xs font-bangla text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] transition-all resize-none" />
                </div>
                {/* Focus Keywords */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 mb-1 block">Focus Keywords</label>
                  <div className="flex flex-wrap gap-1.5 mb-2 font-sans">
                    {focusKeywords.map((kw, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-red-50 text-[#eb1c24] border border-red-200 text-[10px] font-bold rounded-lg flex items-center gap-1.5">
                        {kw}
                        <button onClick={() => setFocusKeywords(focusKeywords.filter((_, i) => i !== idx))} className="cursor-pointer hover:text-red-800"><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="Add keyword..." value={newKeywordInput} onChange={(e) => setNewKeywordInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && newKeywordInput.trim()) { e.preventDefault(); setFocusKeywords([...new Set([...focusKeywords, newKeywordInput.trim()])]); setNewKeywordInput(''); } }} className="flex-1 px-3 py-1.5 text-[11px] font-bangla border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]" />
                    <button onClick={() => { if (newKeywordInput.trim()) { setFocusKeywords([...new Set([...focusKeywords, newKeywordInput.trim()])]); setNewKeywordInput(''); } }} className="px-3 py-1.5 bg-slate-800 text-white text-[11px] font-bold rounded-xl hover:bg-slate-900 cursor-pointer">Add</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories & Tags */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">Categories & Tags</h4>
              <div className="space-y-4">
                {/* Categories Panel */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-700 block">Categories</label>
                  <div className="space-y-2 text-xs font-semibold text-slate-700 font-bangla max-h-32 overflow-y-auto pr-1">
                    {categories.length > 0 ? categories.map((cat) => {
                      const catName = cat.translations?.bn?.name || cat.translations?.en?.name || (typeof cat.name === 'object' ? cat.name?.bn || cat.name?.en : cat.name) || 'Category';
                      return (
                        <label key={cat._id} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                          <input type="radio" name="category" checked={selectedCategory === cat._id} onChange={() => setSelectedCategory(cat._id)} className="rounded-full border-slate-300 text-[#eb1c24] focus:ring-red-200" />
                          <span>{catName}</span>
                        </label>
                      );
                    }) : <div className="text-slate-400 text-[10px]">No categories available</div>}
                  </div>
                  {showAddCatModal ? (
                    <div className="flex items-center gap-2 pt-1">
                      <input type="text" placeholder="Category name..." value={newCatInput} onChange={(e) => setNewCatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddNewCategory()} className="flex-1 px-2.5 py-1 text-[11px] border border-slate-200 rounded-lg font-bangla outline-none focus:border-[#eb1c24]" />
                      <button onClick={handleAddNewCategory} className="px-2.5 py-1 bg-[#eb1c24] text-white text-[11px] font-bold rounded-lg cursor-pointer">Save</button>
                      <button onClick={() => setShowAddCatModal(false)} className="p-1 text-slate-400 hover:text-slate-600"><X size={14} /></button>
                    </div>
                  ) : (
                    <button onClick={() => setShowAddCatModal(true)} className="text-[11px] font-bold text-[#eb1c24] hover:underline flex items-center gap-1 cursor-pointer">
                      <Plus size={12} /> Add New Category
                    </button>
                  )}
                </div>

                {/* Tags Panel */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <label className="text-[11px] font-bold text-slate-700 block">Tags</label>
                  <div className="flex flex-wrap gap-1.5 font-bangla">
                    {tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[10px] font-bold flex items-center gap-1">
                        {tag} <button onClick={() => removeTag(tag)} className="cursor-pointer text-slate-400 hover:text-red-600"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="New tag..." value={newTagInput} onChange={(e) => setNewTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTag()} className="flex-1 px-2.5 py-1.5 text-[11px] border border-slate-200 rounded-lg font-bangla outline-none focus:border-[#eb1c24]" />
                    <button onClick={addTag} className="px-2.5 py-1.5 bg-slate-800 text-white text-[11px] font-bold rounded-lg cursor-pointer">Add</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          {/* 2-Column Split Grid (Featured Image & Publishing) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Image Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>Featured Image</span>
              </h4>
              <input type="file" ref={imageFileInputRef} onChange={handleImageFileUpload} accept="image/*" className="hidden" />
              {featuredImage ? (
                <div className="rounded-xl overflow-hidden border border-slate-200 relative group">
                  <img src={featuredImage} alt={altText || 'Featured'} className="w-full h-36 object-cover" />
                </div>
              ) : (
                <div onClick={handleFeaturedImageChange} className="h-36 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#eb1c24] hover:bg-red-50/20 flex flex-col items-center justify-center text-slate-400 hover:text-[#eb1c24] cursor-pointer transition-all">
                  <Upload size={24} />
                  <span className="text-[11px] font-bold mt-1">Upload Featured Image</span>
                  <span className="text-[10px] text-slate-400">Click to select file</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button onClick={handleFeaturedImageChange} className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
                  {featuredImage ? 'Change Image' : 'Upload Image'}
                </button>
                <button onClick={() => { const url = prompt('ইমেজ URL পেস্ট করুন:', featuredImage); if (url) { setFeaturedImage(url); showToast('ইমেজ URL সেট করা হয়েছে!'); } }} className="py-1.5 px-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
                  URL
                </button>
                {featuredImage && (
                  <button onClick={() => setFeaturedImage('')} className="py-1.5 px-3 border border-slate-200 hover:bg-rose-50 text-rose-600 text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
                    Remove
                  </button>
                )}
              </div>
              <div className="space-y-3 pt-3 border-t border-slate-100 text-[11px]">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#eb1c24] flex items-center gap-1">
                    <Sparkles size={12} /> AI Generated Details
                  </p>
                  <button onClick={handleAiRegenerateImageDetails} disabled={isAiLoading} className="text-[10px] font-bold text-[#eb1c24] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50">
                    <Sparkles size={10} className={loadingAiAction === 'image_details' ? 'animate-spin' : ''} />
                    <span>{loadingAiAction === 'image_details' ? 'Generating...' : 'Regenerate'}</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Alt Text</label>
                    <input type="text" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Image alt text..." className="w-full px-2 py-1 text-[11px] font-bangla text-slate-800 bg-slate-50 border border-slate-200 rounded outline-none focus:border-[#eb1c24]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Caption</label>
                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Image caption..." className="w-full px-2 py-1 text-[11px] font-bangla text-slate-800 bg-slate-50 border border-slate-200 rounded outline-none focus:border-[#eb1c24]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Credit</label>
                    <input type="text" value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="Photo credit..." className="w-full px-2 py-1 text-[11px] font-bangla text-slate-800 bg-slate-50 border border-slate-200 rounded outline-none focus:border-[#eb1c24]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col">
              <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">Publishing</h4>
              <div className="space-y-3 flex-1">
                <div className="space-y-2 text-[11px] font-semibold text-slate-700">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Publish Immediately</span>
                    <input type="checkbox" checked={publishOptions.immediately} onChange={(e) => setPublishOptions({ ...publishOptions, immediately: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  </label>
                  {!publishOptions.immediately && (
                    <div className="flex items-center gap-2 pl-4 py-1">
                      <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[11px] font-bold text-slate-800 outline-none flex-1" />
                      <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[11px] font-bold text-slate-800 outline-none w-24" />
                    </div>
                  )}
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Allow Comments</span>
                    <input type="checkbox" checked={publishOptions.allowComments} onChange={(e) => setPublishOptions({ ...publishOptions, allowComments: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Show on Homepage</span>
                    <input type="checkbox" checked={publishOptions.showHomepage} onChange={(e) => setPublishOptions({ ...publishOptions, showHomepage: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Featured Post</span>
                    <input type="checkbox" checked={publishOptions.featured} onChange={(e) => setPublishOptions({ ...publishOptions, featured: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Breaking News</span>
                    <input type="checkbox" checked={publishOptions.breaking} onChange={(e) => setPublishOptions({ ...publishOptions, breaking: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Auto Share Social</span>
                    <input type="checkbox" checked={publishOptions.autoShareSocial} onChange={(e) => setPublishOptions({ ...publishOptions, autoShareSocial: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  </label>
                </div>
              </div>
              <div className="pt-2 mt-auto border-t border-slate-100">
                <button onClick={handlePublishPost} disabled={isPublishing} className="w-full py-2.5 bg-[#eb1c24] hover:bg-red-700 text-white font-black text-[11px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md shadow-red-500/25 transition-all cursor-pointer disabled:opacity-50">
                  <Rocket size={14} />
                  <span>{isPublishing ? 'PUBLISHING...' : 'PUBLISH POST'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: RIGHT SIDEBAR (~33% - xl:col-span-4) ================= */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <Sparkles size={15} className="text-[#eb1c24]" />
                AI Generated Suggestions
              </h3>
              <button 
                onClick={() => handleAiRegenerateSidebar('all')} 
                disabled={isAiLoading}
                className="text-[11px] font-bold text-[#eb1c24] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RotateCw size={12} className={isAiLoading ? 'animate-spin' : ''} /> Regenerate All
              </button>
            </div>

            {/* 1. Excerpt */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <FileText size={13} className="text-[#eb1c24]" />
                <span>Excerpt</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-bangla">
                {isAiLoading ? 'Generating...' : aiSuggestions.excerpt || <span className="text-slate-400 italic">Write content or click Regenerate to generate Excerpt...</span>}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => applyAiSuggestion('excerpt', aiSuggestions.excerpt)}
                  disabled={!aiSuggestions.excerpt}
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  <Check size={12} /> Accept
                </button>
                <button 
                  onClick={() => handleAiRegenerateSidebar('excerpt')} 
                  disabled={isAiLoading}
                  className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={11} className={isAiLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* 2. SEO Title */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <SearchCheck size={13} className="text-[#eb1c24]" />
                <span>SEO Title</span>
              </p>
              <p className="text-[11px] text-slate-600 font-semibold font-bangla">
                {isAiLoading ? 'Generating...' : aiSuggestions.seoTitle || <span className="text-slate-400 italic">Write content to generate SEO Title...</span>}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => applyAiSuggestion('seoTitle', aiSuggestions.seoTitle)}
                  disabled={!aiSuggestions.seoTitle}
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  <Check size={12} /> Accept
                </button>
                <button 
                  onClick={() => handleAiRegenerateSidebar('seo')} 
                  disabled={isAiLoading}
                  className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={11} className={isAiLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* 3. Meta Description */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <FileText size={13} className="text-[#eb1c24]" />
                <span>Meta Description</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-bangla">
                {isAiLoading ? 'Generating...' : aiSuggestions.metaDescription || <span className="text-slate-400 italic">Write content to generate Meta Description...</span>}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => applyAiSuggestion('metaDescription', aiSuggestions.metaDescription)}
                  disabled={!aiSuggestions.metaDescription}
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  <Check size={12} /> Accept
                </button>
                <button 
                  onClick={() => handleAiRegenerateSidebar('seo')} 
                  disabled={isAiLoading}
                  className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={11} className={isAiLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* 4. Focus Keywords */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Tag size={13} className="text-[#eb1c24]" />
                <span>Focus Keywords</span>
              </p>
              <div className="flex flex-wrap gap-1">
                {isAiLoading ? <span className="text-[11px] text-slate-500">Generating...</span> : aiSuggestions.focusKeywords?.length > 0 ? aiSuggestions.focusKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-bold rounded">
                    {kw}
                  </span>
                )) : <span className="text-[11px] text-slate-400 italic">No keywords generated yet</span>}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => {
                    setFocusKeywords(Array.from(new Set([...focusKeywords, ...aiSuggestions.focusKeywords])));
                    showToast('Focus Keywords যুক্ত করা হয়েছে!');
                  }}
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Check size={12} /> Accept
                </button>
                <button 
                  onClick={() => handleAiRegenerateSidebar('seo')} 
                  disabled={isAiLoading}
                  className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={11} className={isAiLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* 5. Tags */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Tag size={13} className="text-[#eb1c24]" />
                <span>Tags</span>
              </p>
              <div className="flex flex-wrap gap-1 font-bangla">
                {isAiLoading ? <span className="text-[11px] text-slate-500">Generating...</span> : aiSuggestions.tags?.length > 0 ? aiSuggestions.tags.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-bold rounded">
                    {t}
                  </span>
                )) : <span className="text-[11px] text-slate-400 italic">No tags generated yet</span>}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => {
                    setTags(Array.from(new Set([...tags, ...aiSuggestions.tags])));
                    showToast('Tags গ্রহণ করা হয়েছে!');
                  }} 
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Check size={12} /> Accept
                </button>
                <button 
                  onClick={() => handleAiRegenerateSidebar('tags')} 
                  disabled={isAiLoading}
                  className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={11} className={isAiLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* 6. Suggested Category */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <FolderTree size={13} className="text-[#eb1c24]" />
                <span>Suggested Category</span>
              </p>
              <p className="text-[11px] font-extrabold text-slate-800 font-bangla">
                {isAiLoading ? 'Generating...' : aiSuggestions.category} <span className="text-emerald-600 ml-1 font-bold">Confidence: High</span>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => {
                    toggleCategory(aiSuggestions.category);
                    showToast('Suggested Category গ্রহণ করা হয়েছে!');
                  }} 
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Check size={12} /> Accept
                </button>
                <button 
                  onClick={() => handleAiRegenerateSidebar('tags')} 
                  disabled={isAiLoading}
                  className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={11} className={isAiLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* 7. AI Summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Bot size={13} className="text-[#eb1c24]" />
                <span>AI Summary</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-bangla">
                {isAiLoading ? 'Generating...' : aiSuggestions.excerpt}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => { setExcerpt(aiSuggestions.excerpt); showToast('AI Summary গ্রহণ করা হয়েছে!'); }} 
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Check size={12} /> Accept
                </button>
                <button 
                  onClick={() => handleAiRegenerateSidebar('excerpt')} 
                  disabled={isAiLoading}
                  className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={11} className={isAiLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* 8. Fact Check */}
            <div className="p-3 bg-emerald-600 text-white rounded-xl flex items-center justify-between shadow-xs">
              <div>
                <span className="bg-white text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">AI Powered</span>
                <p className="text-[10px] font-bold text-white mt-1">Click to run fact-check analysis.</p>
              </div>
              <button 
                onClick={handleAiFactCheck} 
                disabled={isAiLoading}
                className="text-[10px] font-extrabold text-white underline cursor-pointer disabled:opacity-50"
              >
                Run Fact Check
              </button>
            </div>
          </div>

          {/* 1. Languages Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Languages</h3>
              <span className="text-[10px] font-extrabold text-[#eb1c24] bg-red-50 border border-red-200 px-2 py-0.5 rounded flex items-center gap-1 shadow-2xs">
                <Sparkles size={11} /> Auto Draft
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {/* Bengali Tab */}
              <div 
                onClick={() => handleSwitchLanguage('bn')}
                className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${activeLang === 'bn' ? 'bg-slate-800 text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <Globe2 size={15} className={activeLang === 'bn' ? 'text-white' : 'text-slate-500'} />
                  <span className="font-bangla">বাংলা (Default)</span>
                </div>
                <span className={`${activeLang === 'bn' ? 'bg-emerald-500' : 'bg-slate-300 text-slate-700'} text-white text-[10px] font-black px-2 py-0.5 rounded`}>
                  {activeLang === 'bn' ? 'Active' : 'Ready'}
                </span>
              </div>

              {/* English Tab */}
              <div 
                onClick={() => handleSwitchLanguage('en')}
                className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${activeLang === 'en' ? 'bg-slate-800 text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}
              >
                <div>
                  <div className={`font-bold ${activeLang === 'en' ? 'text-white' : 'text-slate-800'}`}>English</div>
                  <div className={`text-[10px] ${activeLang === 'en' ? 'text-slate-300' : 'text-slate-400'}`}>Generated by AI</div>
                </div>
                <span className={`${activeLang === 'en' ? 'bg-emerald-500' : translatingLang === 'en' ? 'bg-amber-500 animate-pulse' : translationsStore.en?.title ? 'bg-emerald-600' : 'bg-slate-300 text-slate-700'} text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1`}>
                  {translatingLang === 'en' && <RotateCw size={10} className="animate-spin" />}
                  {activeLang === 'en' ? 'Active' : translatingLang === 'en' ? 'Drafting...' : translationsStore.en?.title ? 'Ready' : 'Auto Draft'}
                </span>
              </div>

              {/* Hindi Tab */}
              <div 
                onClick={() => handleSwitchLanguage('hi')}
                className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${activeLang === 'hi' ? 'bg-slate-800 text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}
              >
                <div>
                  <div className={`font-bold font-bangla ${activeLang === 'hi' ? 'text-white' : 'text-slate-800'}`}>हिंदी</div>
                  <div className={`text-[10px] ${activeLang === 'hi' ? 'text-slate-300' : 'text-slate-400'}`}>Generated by AI</div>
                </div>
                <span className={`${activeLang === 'hi' ? 'bg-emerald-500' : translatingLang === 'hi' ? 'bg-amber-500 animate-pulse' : translationsStore.hi?.title ? 'bg-emerald-600' : 'bg-slate-300 text-slate-700'} text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1`}>
                  {translatingLang === 'hi' && <RotateCw size={10} className="animate-spin" />}
                  {activeLang === 'hi' ? 'Active' : translatingLang === 'hi' ? 'Drafting...' : translationsStore.hi?.title ? 'Ready' : 'Auto Draft'}
                </span>
              </div>
            </div>

            <button onClick={() => showToast('বাংলা, ইংরেজি ও হিন্দি ড্রাফট প্রস্তুত রয়েছে!')} className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer">
              <Plus size={14} /> Add New Language
            </button>
          </div>

          {/* 2. SEO Score Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-xs text-slate-900">SEO Score</h3>

            {/* Circular SEO Score Meter */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block">SEO Quality</span>
                <span className={`font-black text-sm ${calcSeoScore() >= 80 ? 'text-emerald-600' : calcSeoScore() >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {calcSeoScore() >= 80 ? 'Excellent' : calcSeoScore() >= 50 ? 'Good' : 'Needs Work'}
                </span>
              </div>

              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 transform">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={calcSeoScore() >= 80 ? '#059669' : calcSeoScore() >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="3" strokeDasharray={`${calcSeoScore()}, 100`} />
                </svg>
                <span className="absolute font-black text-base text-slate-900">{calcSeoScore()}</span>
              </div>
            </div>

            {/* Real-time SEO Checklist */}
            <div className="space-y-2 text-xs font-semibold text-slate-700 border-t border-slate-100 pt-3">
              {/* Meta Title */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(seoTitle || title || aiSuggestions.seoTitle) ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-amber-500" />}
                  <span>Meta Title</span>
                </div>
                <span className={`text-[10px] font-extrabold ${seoTitle || title || aiSuggestions.seoTitle ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {seoTitle || title || aiSuggestions.seoTitle ? 'Good' : 'Missing'}
                </span>
              </div>

              {/* Meta Description */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(metaDescription || excerpt || aiSuggestions.metaDescription) ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-amber-500" />}
                  <span>Meta Description</span>
                </div>
                <span className={`text-[10px] font-extrabold ${metaDescription || excerpt || aiSuggestions.metaDescription ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {metaDescription || excerpt || aiSuggestions.metaDescription ? 'Good' : 'Missing'}
                </span>
              </div>

              {/* Keywords */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(focusKeywords.length > 0 || (aiSuggestions.focusKeywords && aiSuggestions.focusKeywords.length > 0)) ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-amber-500" />}
                  <span>Keywords</span>
                </div>
                <span className={`text-[10px] font-extrabold ${(focusKeywords.length > 0 || (aiSuggestions.focusKeywords && aiSuggestions.focusKeywords.length > 0)) ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {focusKeywords.length > 0 ? `${focusKeywords.length} Set` : aiSuggestions.focusKeywords?.length > 0 ? `${aiSuggestions.focusKeywords.length} AI` : 'Missing'}
                </span>
              </div>

              {/* Readability */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {wordCount > 50 ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-amber-500" />}
                  <span>Readability</span>
                </div>
                <span className={`text-[10px] font-extrabold ${wordCount > 50 ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {wordCount > 100 ? `${wordCount} words` : wordCount > 30 ? 'Medium' : 'Short'}
                </span>
              </div>

              {/* Images */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {featuredImage ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-amber-500" />}
                  <span>Featured Image</span>
                </div>
                <span className={`text-[10px] font-extrabold ${featuredImage ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {featuredImage ? 'Added' : 'Missing'}
                </span>
              </div>

              {/* URL Slug */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(slug || title) ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-amber-500" />}
                  <span>URL Slug</span>
                </div>
                <span className={`text-[10px] font-extrabold ${(slug || title) ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {slug ? 'Custom' : title ? 'Auto' : 'Missing'}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(tags.length > 0 || (aiSuggestions.tags && aiSuggestions.tags.length > 0)) ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-amber-500" />}
                  <span>Tags</span>
                </div>
                <span className={`text-[10px] font-extrabold ${(tags.length > 0 || (aiSuggestions.tags && aiSuggestions.tags.length > 0)) ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {tags.length > 0 ? `${tags.length} Added` : aiSuggestions.tags?.length > 0 ? `${aiSuggestions.tags.length} AI` : 'Missing'}
                </span>
              </div>
            </div>

            <button 
              onClick={() => handleAiRegenerateSidebar('seo')} 
              disabled={isAiLoading}
              className="w-full py-1.5 text-[#eb1c24] text-xs font-extrabold hover:underline flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <RotateCw size={12} className={isAiLoading ? 'animate-spin' : ''} /> Re-analyze SEO Score
            </button>
          </div>

          {/* Social Media Panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900">Social Media Share</h4>
              <span className="text-[10px] font-bold text-[#eb1c24] flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded">
                <Sparkles size={11} /> AI Generated
              </span>
            </div>

            {editingCaptions ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Share2 size={10} className="text-blue-600"/> Facebook</label>
                  <textarea value={socialCaptions.facebook} onChange={(e) => setSocialCaptions({ ...socialCaptions, facebook: e.target.value })} rows={2} className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-bangla text-[11px] outline-none focus:border-[#eb1c24] resize-none" placeholder="Facebook Caption..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Share2 size={10} className="text-slate-900"/> Twitter (X)</label>
                  <textarea value={socialCaptions.twitter} onChange={(e) => setSocialCaptions({ ...socialCaptions, twitter: e.target.value })} rows={2} className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-bangla text-[11px] outline-none focus:border-[#eb1c24] resize-none" placeholder="Twitter Caption..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Share2 size={10} className="text-green-600"/> WhatsApp</label>
                  <textarea value={socialCaptions.whatsapp} onChange={(e) => setSocialCaptions({ ...socialCaptions, whatsapp: e.target.value })} rows={2} className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-bangla text-[11px] outline-none focus:border-[#eb1c24] resize-none" placeholder="WhatsApp Caption..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Share2 size={10} className="text-blue-500"/> Telegram</label>
                  <textarea value={socialCaptions.telegram} onChange={(e) => setSocialCaptions({ ...socialCaptions, telegram: e.target.value })} rows={2} className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-bangla text-[11px] outline-none focus:border-[#eb1c24] resize-none" placeholder="Telegram Caption..." />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingCaptions(false); showToast('সোশাল মিডিয়া ক্যাপশন সেভ হয়েছে!'); }} className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg cursor-pointer">
                    Save Captions
                  </button>
                  <button onClick={handleGenerateSocialCaptions} disabled={isGeneratingCaptions} className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg cursor-pointer disabled:opacity-50 flex justify-center items-center gap-1">
                    <Wand2 size={12} /> {isGeneratingCaptions ? 'Generating...' : 'Regenerate'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-[11px] font-bangla">
                {(socialCaptions.facebook || socialCaptions.twitter || socialCaptions.whatsapp || socialCaptions.telegram) ? (
                  <>
                    {socialCaptions.facebook && (
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 flex items-start gap-2">
                        <Share2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-slate-900 mb-0.5">Facebook</p>
                          <p className="line-clamp-2 text-slate-600 whitespace-pre-wrap">{socialCaptions.facebook}</p>
                        </div>
                      </div>
                    )}
                    {socialCaptions.twitter && (
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 flex items-start gap-2">
                        <Share2 size={14} className="text-slate-900 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-slate-900 mb-0.5">Twitter (X)</p>
                          <p className="line-clamp-2 text-slate-600 whitespace-pre-wrap">{socialCaptions.twitter}</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-slate-500 text-center py-2">কোনো ক্যাপশন জেনারেট করা হয়নি</p>
                )}
                
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setEditingCaptions(true)} className="flex-1 py-1.5 text-slate-700 hover:bg-slate-50 border border-slate-200 text-[11px] font-bold rounded-lg cursor-pointer">
                    Edit Captions
                  </button>
                  <button onClick={handleGenerateSocialCaptions} disabled={isGeneratingCaptions} className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-bold rounded-lg cursor-pointer disabled:opacity-50 flex justify-center items-center gap-1">
                    <Sparkles size={12} /> {isGeneratingCaptions ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Interactive Post Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4 font-bangla border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#eb1c24] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">Live Preview</span>
                <span className="text-xs text-slate-400 font-sans font-semibold">{(import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')}/{activeLang || 'bn'}/news/{slug}</span>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Simulated Client Website Article View */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {(() => {
                  const cat = categories.find(c => c._id === selectedCategory);
                  const catName = cat?.translations?.bn?.name || cat?.name || '';
                  return catName ? <span className="bg-[#eb1c24] text-white px-2.5 py-0.5 rounded-md text-[11px]">{catName}</span> : null;
                })()}
                {tags.map((t) => (
                  <span key={t} className="bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-md text-[11px]">{t}</span>
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {title || 'পোস্টের টাইটেল এখানে দেখা যাবে...'}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-sans border-y border-slate-100 py-2.5">
                <span>By Nirbhik Bangla Editorial Desk</span>
                <span>•</span>
                <span>Published {new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>

              {featuredImage && (
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img src={featuredImage} alt={altText} className="w-full h-80 object-cover" />
                  {caption && <p className="p-2.5 bg-slate-50 text-xs text-slate-500 text-center italic">{caption}</p>}
                </div>
              )}

              <div className="text-base leading-relaxed text-slate-800 space-y-4">
                {excerpt && <p className="font-semibold text-slate-900 border-l-4 border-[#eb1c24] pl-3 py-1 bg-slate-50 rounded-r-lg">{excerpt}</p>}
                <div dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || '<p className="text-slate-400 italic">কন্টেন্ট এখানে প্রিভিউ হবে...</p>' }} />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 font-sans">
              <button onClick={() => setShowPreviewModal(false)} className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer">
                Close Preview
              </button>
              <button onClick={() => { setShowPreviewModal(false); handlePublishPost(); }} className="px-5 py-2 bg-[#eb1c24] text-white text-xs font-black rounded-xl hover:bg-red-700 cursor-pointer">
                Publish Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Title Options Modal */}
      {showTitleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl p-6 space-y-4 font-bangla border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#eb1c24] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase flex items-center gap-1 shadow-xs">
                  <Sparkles size={12} /> AI Suggestions
                </span>
                <h3 className="font-extrabold text-sm text-slate-900">শিরোনাম নির্বাচন করুন</h3>
              </div>
              <button onClick={() => setShowTitleModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              AI আপনার সংবাদের উপর ভিত্তি করে নিম্নলিখিত শিরোনামগুলো তৈরি করেছে। আপনার পছন্দের শিরোনামে ক্লিক করে নির্বাচন করুন:
            </p>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {generatedTitles.map((t, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectGeneratedTitle(t)}
                  className="p-3.5 bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-300 rounded-2xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 group-hover:bg-[#eb1c24] group-hover:text-white text-slate-700 text-xs font-black flex items-center justify-center shrink-0 transition-colors">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-slate-900 leading-relaxed font-bangla">
                      {t}
                    </span>
                  </div>
                  <button className="px-3 py-1 bg-white group-hover:bg-[#eb1c24] text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-red-600 text-[10px] font-extrabold rounded-xl shrink-0 transition-all shadow-2xs">
                    Choose
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-sans">
              <button
                onClick={handleAiGenerateTitle}
                disabled={isAiLoading}
                className="text-xs font-bold text-[#eb1c24] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RotateCw size={13} className={isAiLoading ? 'animate-spin' : ''} /> Regenerate Options
              </button>
              <button
                onClick={() => setShowTitleModal(false)}
                className="px-4 py-1.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
