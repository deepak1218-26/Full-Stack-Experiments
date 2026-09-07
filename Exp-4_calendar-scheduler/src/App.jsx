import { useCallback, useMemo, useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import PostList, {
  NonOptimizedPostList,
} from "./PostList";

import "./App.css";


/* =========================================
   HELPER FUNCTION
   Convert date to local ISO format
========================================= */

function formatLocalDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}


/* =========================================
   MAIN APP
========================================= */

function App() {
  /* ---------------------------------------
     PERFORMANCE COUNTERS

     useRef changes do NOT cause
     another React render.
  --------------------------------------- */

  const appRenderCount = useRef(0);
  const memoCalculationCount = useRef(0);

  appRenderCount.current += 1;


  /* ---------------------------------------
     POSTS STATE
  --------------------------------------- */

  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Instagram Product Launch",
      date: "2026-08-20T10:00:00",
      platform: "Instagram",
    },
    {
      id: "2",
      title: "LinkedIn Career Post",
      date: "2026-08-21T14:00:00",
      platform: "LinkedIn",
    },
    {
      id: "3",
      title: "Facebook Weekend Post",
      date: "2026-08-23T11:00:00",
      platform: "Facebook",
    },
  ]);


  /* ---------------------------------------
     FORM STATE
  --------------------------------------- */

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [scheduleDate, setScheduleDate] =
    useState("2026-08-25");
  const [scheduleTime, setScheduleTime] =
    useState("10:00");


  /* ---------------------------------------
     OPTIMIZATION MODE

     true  = Optimized
     false = Non-Optimized
  --------------------------------------- */

  const [optimized, setOptimized] = useState(true);


  /* =========================================
     useMemo OPTIMIZATION

     This calculation only runs again when
     posts change.
  ========================================= */

  const memoizedCalendarEvents = useMemo(() => {
    memoCalculationCount.current += 1;

    console.log(
      "🟢 useMemo calculated calendar events:",
      memoCalculationCount.current
    );

    return posts.map((post) => ({
      id: post.id,
      title: `${post.platform}: ${post.title}`,
      start: post.date,
      extendedProps: {
        platform: post.platform,
      },
    }));
  }, [posts]);


  /* ---------------------------------------
     NON-OPTIMIZED EVENTS

     This creates a new array on every
     App render.
  --------------------------------------- */

  const nonOptimizedCalendarEvents = posts.map(
    (post) => ({
      id: post.id,
      title: `${post.platform}: ${post.title}`,
      start: post.date,
      extendedProps: {
        platform: post.platform,
      },
    })
  );


  /* ---------------------------------------
     Select which version to use
  --------------------------------------- */

  const calendarEvents = optimized
    ? memoizedCalendarEvents
    : nonOptimizedCalendarEvents;


  /* =========================================
     ADD NEW POST
  ========================================= */

  const handleAddPost = useCallback(
    (event) => {
      event.preventDefault();

      if (!title.trim()) {
        alert("Please enter a post title.");
        return;
      }

      const newPost = {
        id: Date.now().toString(),
        title: title.trim(),
        date: `${scheduleDate}T${scheduleTime}:00`,
        platform,
      };

      setPosts((currentPosts) => [
        ...currentPosts,
        newPost,
      ]);

      setTitle("");
    },
    [
      title,
      platform,
      scheduleDate,
      scheduleTime,
    ]
  );


  /* =========================================
     DELETE POST
  ========================================= */

  const handleDeletePost = useCallback((id) => {
    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== id
      )
    );
  }, []);


  /* =========================================
     CLICK CALENDAR EVENT
  ========================================= */

  const handleEventClick = useCallback((info) => {
    const platform =
      info.event.extendedProps.platform;

    alert(
      `Post: ${info.event.title}\nPlatform: ${platform}`
    );
  }, []);


  /* =========================================
     DRAG / DROP EVENT
  ========================================= */

  const handleEventDrop = useCallback((info) => {
    const postId = info.event.id;

    const newDate = formatLocalDateTime(
      info.event.start
    );

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              date: newDate,
            }
          : post
      )
    );
  }, []);


  /* =========================================
     RENDER UI
  ========================================= */

  return (
    <div className="app-container">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="app-header">
        <h1>
          📅 Social Media Scheduler
        </h1>

        <p>
          Schedule and manage your social media
          posts using an interactive calendar.
        </p>
      </header>


      {/* =====================================
          OPTIMIZATION MODE
      ===================================== */}

      <section className="performance-panel">

        <h2>
          ⚡ Rendering Performance Comparison
        </h2>

        <p className="performance-description">
          Compare component rendering with and
          without React optimization techniques.
        </p>


        <div className="optimization-buttons">

          <button
            className={
              optimized
                ? "mode-button active"
                : "mode-button"
            }
            onClick={() => setOptimized(true)}
          >
            🟢 Optimized
          </button>


          <button
            className={
              !optimized
                ? "mode-button active non-optimized"
                : "mode-button"
            }
            onClick={() => setOptimized(false)}
          >
            🔴 Non-Optimized
          </button>

        </div>


        {/* CURRENT MODE */}

        <div className="current-mode">
          <strong>Current Mode:</strong>{" "}

          {optimized ? (
            <span className="optimized-text">
              🟢 Optimized
            </span>
          ) : (
            <span className="non-optimized-text">
              🔴 Non-Optimized
            </span>
          )}
        </div>


        {/* =================================
            PERFORMANCE STATISTICS
        ================================= */}

        <div className="render-stats">

          {/* APP RENDERS */}

          <div className="stat-card">
            <h3>App Renders</h3>

            <div className="stat-number">
              {appRenderCount.current}
            </div>

            <p>
              Parent component
            </p>
          </div>


          {/* OPTIMIZED */}

          <div className="stat-card optimized-card">
            <h3>
              🟢 Optimized Renders
            </h3>

            <div className="stat-number">
              {optimized ? "React.memo" : "—"}
            </div>

            <p>
              Prevents unnecessary renders
            </p>
          </div>


          {/* NON-OPTIMIZED */}

          <div className="stat-card non-optimized-card">
            <h3>
              🔴 Non-Optimized
            </h3>

            <div className="stat-number">
              {!optimized
                ? "No memoization"
                : "—"}
            </div>

            <p>
              Renders without React.memo
            </p>
          </div>


          {/* USEMEMO */}

          <div className="stat-card">
            <h3>
              useMemo Calculations
            </h3>

            <div className="stat-number">
              {memoCalculationCount.current}
            </div>

            <p>
              Calendar event calculations
            </p>
          </div>

        </div>


        {/* =================================
            EXPLANATION
        ================================= */}

        <div className="comparison-info">

          {optimized ? (
            <>
              <h3>🟢 Optimized Mode</h3>

              <p>
                React.memo prevents the PostList
                component from re-rendering when
                its props have not changed.
                useMemo also avoids unnecessary
                calendar event calculations.
              </p>
            </>
          ) : (
            <>
              <h3>🔴 Non-Optimized Mode</h3>

              <p>
                The PostList component can
                re-render whenever the parent
                component renders, and calendar
                events are recalculated on every
                render.
              </p>
            </>
          )}

        </div>

      </section>


      {/* =====================================
          SCHEDULING FORM
      ===================================== */}

      <section className="scheduler-section">

        <h2>
          Schedule New Post
        </h2>

        <form
          className="schedule-form"
          onSubmit={handleAddPost}
        >

          {/* TITLE */}

          <div className="form-group">

            <label>
              Post Title
            </label>

            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />

          </div>


          {/* PLATFORM */}

          <div className="form-group">

            <label>
              Platform
            </label>

            <select
              value={platform}
              onChange={(event) =>
                setPlatform(event.target.value)
              }
            >
              <option value="Instagram">
                Instagram
              </option>

              <option value="LinkedIn">
                LinkedIn
              </option>

              <option value="Facebook">
                Facebook
              </option>

              <option value="Twitter">
                Twitter
              </option>
            </select>

          </div>


          {/* DATE */}

          <div className="form-group">

            <label>
              Date
            </label>

            <input
              type="date"
              value={scheduleDate}
              onChange={(event) =>
                setScheduleDate(event.target.value)
              }
            />

          </div>


          {/* TIME */}

          <div className="form-group">

            <label>
              Time
            </label>

            <input
              type="time"
              value={scheduleTime}
              onChange={(event) =>
                setScheduleTime(event.target.value)
              }
            />

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="schedule-button"
          >
            + Schedule Post
          </button>

        </form>

      </section>


      {/* =====================================
          CALENDAR
      ===================================== */}

      <section className="calendar-section">

        <h2>
          📆 Post Calendar
        </h2>

        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}

          initialView="dayGridMonth"

          initialDate="2026-08-20"

          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              "dayGridMonth,timeGridWeek,timeGridDay",
          }}

          events={calendarEvents}

          editable={true}

          eventClick={handleEventClick}

          eventDrop={handleEventDrop}

          height="auto"
        />

      </section>


      {/* =====================================
          POST LIST
      ===================================== */}

      {optimized ? (
        <PostList
          posts={posts}
          onDelete={handleDeletePost}
        />
      ) : (
        <NonOptimizedPostList
          posts={posts}
          onDelete={handleDeletePost}
        />
      )}

    </div>
  );
}

export default App;