# Afford Medicals - Backend

## 1. Campus Notification Microservice

The Campus Notification Microservice handles the retrieval, prioritization, and delivery of campus-related notifications (such as placements, exam results, and events). 

**What happens here:**
- **Notification API:** The service exposes endpoints that fetch raw notification data from an external source and format it into a clean structure (ID, Type, Message, Timestamp).
- **Priority Sorting:** Important notifications shouldn't get lost. The service applies priority sorting logic where **Placements** have the highest priority, followed by **Results**, and then general **Events**. If priorities are equal, it sorts by recency (`createdAt`).
- **Background Processing:** To prevent performance bottlenecks when sending notifications to a large number of users, it utilizes a **Bull Queue** backed by **Redis** to process and send batch notifications asynchronously.
- **Database Optimization:** The provided MySQL schema stores notifications with a specialized index on `(userId, isRead, createdAt DESC)`. This is highly optimized for quickly retrieving unread notifications for specific users.

## 2. Vehicle Maintenance Scheduler

The Vehicle Maintenance Scheduler optimizes vehicle maintenance tasks across multiple depots to maximize the overall impact within limited working hours.

**What happens here:**
- **Data Retrieval:** The controller fetches real-time data about `depots` (which have limited `MechanicHours`) and `vehicles` (which require a specific maintenance `Duration` and provide a certain `Impact` when fixed).
- **Depot Matching:** It filters the list of vehicles to group them by their assigned `DepotID`.
- **Resource Optimization (Knapsack Algorithm):** For each depot, the service runs a **Dynamic Programming (0/1 Knapsack)** algorithm. 
- **Goal:** The algorithm selects the best combination of vehicles to service at each depot. Its goal is to maximize the total `Impact` of the maintenance work without exceeding the depot's maximum `MechanicHours`.
- **Automated Scheduling:** It calculates and returns the `maxImpact` achievable for each depot, effectively automating the decision-making process for vehicle maintenance scheduling.
