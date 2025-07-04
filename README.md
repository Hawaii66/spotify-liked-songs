# Spotify Liked Songs (SLS)

A web application designed to help Spotify power-users bring order and advanced organization to their "Liked Songs" library and create dynamic playlists.

## 🌟 Purpose

For avid Spotify listeners who accumulate thousands of "Liked Songs" and constantly discover new music across genres, Spotify's native organization tools often fall short. It becomes challenging to quickly find specific types of music or to manage a vast and diverse collection effectively.

**Spotify Liked Songs (SLS)** addresses this by providing a layer of smart organization on top of your existing Spotify library. Instead of relying on a separate database, SLS intelligently uses Spotify's own playlist system and metadata (like playlist descriptions) to:

- Create and manage custom "category playlists" (e.g., "Country Vibes", "Workout Rap", "Chill Swedish Classics") directly within your Spotify account.
- Generate temporary "combination playlists" by mixing songs from different categories (e.g., "Country + Swedish Songs") which can be set to automatically expire.

This approach provides a powerful, flexible, and fully integrated music organization experience directly within your Spotify ecosystem.

## ✨ Features

- **Custom Category Playlists:** Transform your sprawling "Liked Songs" into clearly defined, user-managed category playlists on Spotify.
- **Dynamic Combination Playlists:** Create temporary playlists that blend multiple custom categories, perfect for specific moods or activities.
- **Seamless Spotify Integration:** All categorization and playlist generation happens directly within your Spotify account.
- **Secure Authentication:** Powered by Clerk for secure and easy login via Spotify.
- **No External Database:** All organizational logic and metadata are managed directly via Spotify's API and clever use of playlist properties (like descriptions).

## 🚀 Getting Started

Follow these steps to configure and run the application locally.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (recommended LTS version)
- [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

You'll also need accounts with:

- [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
- [Clerk](https://clerk.com/)

### Installation & Configuration

#### 1. Configure your Spotify App

1.  Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and log in.
2.  Click "Create an app".
3.  Fill in "App name" (e.g., "Spotify Liked Songs (SLS)") and "App description". Click "Create".
4.  Note down your `Client ID` and `Client Secret`. You'll need these in the next step.
5.  Add the required permissions found in [.env.example](.env.example)
6.  Click "Edit Settings".
7.  Under "Redirect URIs", **add the callback URL provided by Clerk**.
8.  Save the changes.

#### 2. Configure Clerk

1.  Go to the [Clerk Dashboard](https://clerk.com/dashboard/) and log in.
2.  Create a new application if you don't have one already.
3.  Navigate to "Authentication" -> "Social Providers".
4.  Enable "Spotify" as a provider.
5.  Enter your `Client ID` and `Client Secret` obtained from your Spotify app.
6.  Note down your `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` from the Clerk Dashboard

#### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in the missing environment variables.

#### 4. Run the Application

1.  Install dependencies:
    ```bash
    pnpm install
    ```
2.  Start the development server:
    ```bash
    pnpm dev
    ```

The application should now be accessible in your web browser at `http://localhost:3000`.

## 🛠️ Technologies Used

- **Next.js:** Full-stack React framework for frontend and API routes.
- **Tanstack Query:** Efficient data fetching, caching, and synchronization.
- **tRPC:** End-to-end type-safe API calls between frontend and backend.
- **Clerk:** Robust and secure authentication solutions.
- **Spotify Web API:** For all interactions with Spotify services (fetching liked songs, creating/modifying playlists).

## 🤝 Contributing

Feel like contributing? We welcome all suggestions and pull requests!
