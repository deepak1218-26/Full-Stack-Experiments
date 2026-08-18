import {
  useState,
  useMemo,
  useCallback,
} from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import PostList from "./PostList.jsx";

import "./App.css";

function App() {
  // -----------------------------
  // POST STATE
  // -----------------------------

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

  // -----------------------------
  // FORM STATE
  // -----------------------------

  const [title, setTitle] = useState("");
  const [platform, setPlatform] =
    useState("Instagram");

  const [scheduleDate, setScheduleDate] =
    useState("2026-08-25");

  const [scheduleTime, setScheduleTime] =
    useState("10:00");

  // -----------------------------
  // useMemo
  // -----------------------------
  // Converts posts into FullCalendar
  // event objects.
  //
  // The calculation only runs again
  // when posts actually change.

  const calendarEvents = useMemo(() => {
    console.log("Calendar events recalculated");

    return posts.map((post) => ({
      id: post.id,
      title: `${post.platform}: ${post.title}`,
      start: post.date,
    }));
  }, [posts]);

  // -----------------------------
  // ADD POST
  // -----------------------------
  // useCallback keeps the function
  // reference stable between renders.

  const handleAddPost = useCallback(
    (e) => {
      e.preventDefault();

      if (!title.trim()) {
        alert("Please enter a post title.");
        return;
      }

      if (!scheduleDate || !scheduleTime) {
        alert(
          "Please select both date and time."
        );
        return;
      }

      const newPost = {
        id: Date.now().toString(),
        title: title.trim(),
        date: `${scheduleDate}T${scheduleTime}:00`,
        platform: platform,
      };

      setPosts((currentPosts) => [
        ...currentPosts,
        newPost,
      ]);

      setTitle("");

      alert("Post scheduled successfully!");
    },
    [
      title,
      platform,
      scheduleDate,
      scheduleTime,
    ]
  );

  // -----------------------------
  // EVENT CLICK
  // -----------------------------

  const handleEventClick = useCallback(
    (info) => {
      const postTitle = info.event.title;

      const postDate =
        info.event.start.toLocaleString();

      alert(
        `Post: ${postTitle}\nScheduled: ${postDate}`
      );
    },
    []
  );

  // -----------------------------
  // DRAG AND DROP
  // -----------------------------

  const handleEventDrop = useCallback(
    (info) => {
      const postId = info.event.id;
      const newDate = info.event.start;

      if (!newDate) {
        return;
      }

      const year =
        newDate.getFullYear();

      const month = String(
        newDate.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        newDate.getDate()
      ).padStart(2, "0");

      const hours = String(
        newDate.getHours()
      ).padStart(2, "0");

      const minutes = String(
        newDate.getMinutes()
      ).padStart(2, "0");

      const formattedDate =
        `${year}-${month}-${day}` +
        `T${hours}:${minutes}:00`;

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                date: formattedDate,
              }
            : post
        )
      );

      alert(
        "Post rescheduled successfully!"
      );
    },
    []
  );

  // -----------------------------
  // DELETE POST
  // -----------------------------
  // This callback is stable because
  // it does not depend on changing
  // variables.

  const handleDeletePost = useCallback(
    (id) => {
      setPosts((currentPosts) =>
        currentPosts.filter(
          (post) => post.id !== id
        )
      );
    },
    []
  );

  // -----------------------------
  // USER INTERFACE
  // -----------------------------

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h1>
          📅 Social Media Scheduler
        </h1>

        <p>
          Interactive Calendar & Post
          Management
        </p>
      </header>

      {/* SCHEDULER */}
      <section className="scheduler">

        {/* -------------------------
            ADD POST FORM
        -------------------------- */}

        <div className="form-card">

          <h2>Schedule New Post</h2>

          <form onSubmit={handleAddPost}>

            {/* POST TITLE */}

            <label>
              Post Title
            </label>

            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            {/* PLATFORM */}

            <label>
              Platform
            </label>

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(e.target.value)
              }
            >
              <option value="Instagram">
                Instagram
              </option>

              <option value="Facebook">
                Facebook
              </option>

              <option value="LinkedIn">
                LinkedIn
              </option>

              <option value="Twitter">
                Twitter
              </option>
            </select>

            {/* DATE */}

            <label>
              Schedule Date
            </label>

            <input
              type="date"
              value={scheduleDate}
              onChange={(e) =>
                setScheduleDate(
                  e.target.value
                )
              }
            />

            {/* TIME */}

            <label>
              Schedule Time
            </label>

            <input
              type="time"
              value={scheduleTime}
              onChange={(e) =>
                setScheduleTime(
                  e.target.value
                )
              }
            />

            {/* SUBMIT */}

            <button type="submit">
              + Schedule Post
            </button>

          </form>
        </div>

        {/* -------------------------
            CALENDAR
        -------------------------- */}

        <div className="calendar-card">

          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right:
                "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={calendarEvents}
            editable={true}
            selectable={true}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            height="650px"
          />

        </div>

      </section>

      {/* -------------------------
          OPTIMIZED POST LIST
      -------------------------- */}

      <PostList
        posts={posts}
        onDelete={handleDeletePost}
      />

    </div>
  );
}

export default App;