USE [master]
GO

CREATE DATABASE [FUNewsManagementSBA301_v2]
GO

USE [FUNewsManagementSBA301_v2]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Category](
                                 [CategoryID] [int] IDENTITY(1,1) NOT NULL,
                                 [CategoryName] [nvarchar](100) NOT NULL,
                                 [CategoryDesciption] [nvarchar](250) NOT NULL,
                                 [ParentCategoryID] [int] NULL,
                                 [IsActive] [bit] NULL,
                                 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED
                                     (
                                      [CategoryID] ASC
                                         )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[NewsArticle](
                                    [NewsArticleID] [int] IDENTITY(1,1) NOT NULL,
                                    [NewsTitle] [nvarchar](400) NULL,
                                    [Headline] [nvarchar](150) NOT NULL,
                                    [CreatedDate] [datetime] NULL,
                                    [NewsContent] [nvarchar](4000) NULL,
                                    [NewsSource] [nvarchar](400) NULL,
                                    [CategoryID] [int] NULL,
                                    [NewsStatus] [bit] NULL,
                                    [CreatedByID] [int] NULL,
                                    [UpdatedByID] [int] NULL,
                                    [ModifiedDate] [datetime] NULL,
                                    CONSTRAINT [PK_NewsArticle] PRIMARY KEY CLUSTERED
                                        (
                                         [NewsArticleID] ASC
                                            )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[NewsTag](
                                [NewsArticleID] [int] NOT NULL,
                                [TagID] [int] NOT NULL,
                                CONSTRAINT [PK_NewsTag] PRIMARY KEY CLUSTERED
                                    (
                                     [NewsArticleID] ASC,
                                     [TagID] ASC
                                        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SystemAccount](
                                      [AccountID] [int] IDENTITY(1,1) NOT NULL ,
                                      [AccountName] [nvarchar](100) NULL,
                                      [AccountEmail] [nvarchar](70) NULL,
                                      [AccountRole] [int] NULL,
                                      [AccountPassword] [nvarchar](70) NULL,
                                      CONSTRAINT [PK_SystemAccount] PRIMARY KEY CLUSTERED
                                          (
                                           [AccountID] ASC
                                              )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Tag](
                            [TagID] [int] IDENTITY(1,1) NOT NULL,
                            [TagName] [nvarchar](50) NULL,
                            [Note] [nvarchar](400) NULL,
                            CONSTRAINT [PK_HashTag] PRIMARY KEY CLUSTERED
                                (
                                 [TagID] ASC
                                    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


-- CATEGORY (recursive hierarchy)
SET IDENTITY_INSERT [dbo].[Category] ON
GO

INSERT [dbo].[Category] ([CategoryID], [CategoryName], [CategoryDesciption], [ParentCategoryID], [IsActive]) VALUES
                                                                                                                 (1, N'University News', N'General announcements and institutional updates', NULL, 1),
                                                                                                                 (2, N'Academic News', N'Articles about research, faculty, and academics', 1, 1),
                                                                                                                 (3, N'Student Affairs', N'Student activities, clubs, and initiatives', 1, 1),
                                                                                                                 (4, N'Alumni News', N'Updates and achievements from alumni', 1, 1),
                                                                                                                 (5, N'Capstone Projects', N'Projects, innovations, and research showcases', 2, 1),
                                                                                                                 (6, N'Campus Safety', N'Safety, security, and emergency updates', 1, 1)
GO
SET IDENTITY_INSERT [dbo].[Category] OFF
GO


-- SYSTEM ACCOUNT
INSERT [dbo].[SystemAccount] ([AccountName], [AccountEmail], [AccountRole], [AccountPassword]) VALUES
                                                                                                   (N'Emma William', N'EmmaWilliam@FUNewsManagement.org', 2, N'@1'),
                                                                                                   (N'Olivia James', N'OliviaJames@FUNewsManagement.org', 2, N'@1'),
                                                                                                   (N'Isabella David', N'IsabellaDavid@FUNewsManagement.org', 2, N'@1'),
                                                                                                   (N'Michael Charlotte', N'MichaelCharlotte@FUNewsManagement.org', 2, N'@1'),
                                                                                                   (N'Steve Paris', N'SteveParis@FUNewsManagement.org', 1, N'@1')
GO


-- TAG
INSERT [dbo].[Tag] ([TagName], [Note]) VALUES
                                           (N'Education', N'Articles related to education'),
                                           (N'Technology', N'Tech and innovation content'),
                                           (N'Research', N'Academic and research findings'),
                                           (N'Innovation', N'Creative and innovative ideas'),
                                           (N'Campus Life', N'Clubs, student life, and activities'),
                                           (N'Faculty', N'Faculty highlights and achievements'),
                                           (N'Alumni', N'Alumni network and success stories'),
                                           (N'Events', N'University events and programs'),
                                           (N'Resources', N'University resources and facilities')
GO


-- NEWS ARTICLE
INSERT [dbo].[NewsArticle] ([NewsTitle], [Headline], [CreatedDate], [NewsContent], [NewsSource], [CategoryID], [NewsStatus], [CreatedByID], [UpdatedByID], [ModifiedDate]) VALUES
                                                                                                                                                                               (N'FU Celebrates Alumni Achievements', N'FU Alumni Shine Across Industries', '2024-05-05',
                                                                                                                                                                                N'Alumni from FU continue to make significant impacts in business, arts, and science.', N'Internet', 4, 1, 1, 1, '2024-05-05'),

                                                                                                                                                                               (N'Mentorship Program Launches for New Graduates', N'Alumni Association Mentorship Initiative', '2024-05-06',
                                                                                                                                                                                N'The FU Alumni Association launches mentorship for graduates to connect with experienced professionals.', N'FU Portal', 4, 1, 2, 2, '2024-05-06'),

                                                                                                                                                                               (N'AI Department Appoints New Head', N'Leading Scholar Joins FU AI Department', '2024-05-07',
                                                                                                                                                                                N'Dr. Nitzevet joins as Head of AI, bringing deep learning expertise and leadership.', N'N/A', 2, 1, 2, 2, '2024-05-07'),

                                                                                                                                                                               (N'Groundbreaking Research in STEM', N'New Findings in STEM Field', '2024-05-08',
                                                                                                                                                                                N'FU researchers uncover key insights in engineering and mathematics.', N'FU Research Center', 5, 1, 3, 3, '2024-05-08'),

                                                                                                                                                                               (N'Campus Safety Week Launched', N'Safety Awareness Campaign Begins', '2024-05-09',
                                                                                                                                                                                N'The FU campus launches safety awareness week to promote health and emergency readiness.', N'N/A', 6, 1, 4, 4, '2024-05-09')
GO


-- NEWS TAG (mapping)
INSERT [dbo].[NewsTag] ([NewsArticleID], [TagID]) VALUES
                                                      (1, 7), (1, 8), (1, 9),
                                                      (2, 7), (2, 8),
                                                      (3, 2), (3, 4), (3, 6),
                                                      (4, 3), (4, 2), (4, 4),
                                                      (5, 9), (5, 8)
GO


-- =========================================================
-- FOREIGN KEYS
-- =========================================================
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_Parent]
    FOREIGN KEY([ParentCategoryID]) REFERENCES [dbo].[Category] ([CategoryID])
GO

ALTER TABLE [dbo].[NewsArticle]  WITH CHECK ADD  CONSTRAINT [FK_NewsArticle_Category]
    FOREIGN KEY([CategoryID]) REFERENCES [dbo].[Category] ([CategoryID])
        ON UPDATE CASCADE ON DELETE SET NULL
GO

ALTER TABLE [dbo].[NewsArticle]  WITH CHECK ADD  CONSTRAINT [FK_NewsArticle_SystemAccount]
    FOREIGN KEY([CreatedByID]) REFERENCES [dbo].[SystemAccount] ([AccountID])
        ON UPDATE CASCADE ON DELETE SET NULL
GO

ALTER TABLE [dbo].[NewsTag]  WITH CHECK ADD  CONSTRAINT [FK_NewsTag_NewsArticle]
    FOREIGN KEY([NewsArticleID]) REFERENCES [dbo].[NewsArticle] ([NewsArticleID])
        ON DELETE CASCADE
GO

ALTER TABLE [dbo].[NewsTag]  WITH CHECK ADD  CONSTRAINT [FK_NewsTag_Tag]
    FOREIGN KEY([TagID]) REFERENCES [dbo].[Tag] ([TagID])
        ON DELETE CASCADE
GO

USE [master]
GO
ALTER DATABASE [FUNewsManagementSBA301_v2] SET READ_WRITE
GO