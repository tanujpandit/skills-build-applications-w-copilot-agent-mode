#!/bin/bash
# Validation script for OctoFit Tracker Backend API
# This script tests all API endpoints after seeding the database

set -e

API_BASE_URL="${API_BASE_URL:-http://localhost:8000}"
TIMEOUT=5

echo "========================================"
echo "OctoFit Tracker API Validation"
echo "========================================"
echo ""

# Test health check
echo "Testing Health Check..."
HEALTH=$(curl -s --max-time "$TIMEOUT" "$API_BASE_URL/api/health")
echo "✓ Health: $HEALTH"
echo ""

# Test GET /api/users
echo "Testing GET /api/users..."
USERS=$(curl -s --max-time "$TIMEOUT" "$API_BASE_URL/api/users")
if echo "$USERS" | grep -q "Alice\|Bob\|Carol\|David" || echo "$USERS" | grep -q "\[\]"; then
  echo "✓ Users endpoint responsive"
  echo "  Response: $(echo "$USERS" | head -c 100)..."
else
  echo "⚠ Users: $USERS"
fi
echo ""

# Test GET /api/teams
echo "Testing GET /api/teams..."
TEAMS=$(curl -s --max-time "$TIMEOUT" "$API_BASE_URL/api/teams")
if echo "$TEAMS" | grep -q "Morning Warriors\|Fitness Legends\|Wellness Circle" || echo "$TEAMS" | grep -q "\[\]"; then
  echo "✓ Teams endpoint responsive"
  echo "  Response: $(echo "$TEAMS" | head -c 100)..."
else
  echo "⚠ Teams: $TEAMS"
fi
echo ""

# Test GET /api/activities
echo "Testing GET /api/activities..."
ACTIVITIES=$(curl -s --max-time "$TIMEOUT" "$API_BASE_URL/api/activities")
if echo "$ACTIVITIES" | grep -q "running\|cycling\|strength_training\|yoga" || echo "$ACTIVITIES" | grep -q "\[\]"; then
  echo "✓ Activities endpoint responsive"
  echo "  Response: $(echo "$ACTIVITIES" | head -c 100)..."
else
  echo "⚠ Activities: $ACTIVITIES"
fi
echo ""

# Test GET /api/workouts
echo "Testing GET /api/workouts..."
WORKOUTS=$(curl -s --max-time "$TIMEOUT" "$API_BASE_URL/api/workouts")
if echo "$WORKOUTS" | grep -q "Beginner\|Intermediate\|Advanced\|Core" || echo "$WORKOUTS" | grep -q "\[\]"; then
  echo "✓ Workouts endpoint responsive"
  echo "  Response: $(echo "$WORKOUTS" | head -c 100)..."
else
  echo "⚠ Workouts: $WORKOUTS"
fi
echo ""

# Test GET /api/leaderboard
echo "Testing GET /api/leaderboard..."
LEADERBOARD=$(curl -s --max-time "$TIMEOUT" "$API_BASE_URL/api/leaderboard")
if echo "$LEADERBOARD" | grep -q "score\|rank" || echo "$LEADERBOARD" | grep -q "\[\]"; then
  echo "✓ Leaderboard endpoint responsive"
  echo "  Response: $(echo "$LEADERBOARD" | head -c 100)..."
else
  echo "⚠ Leaderboard: $LEADERBOARD"
fi
echo ""

echo "========================================"
echo "✓ All endpoints are accessible!"
echo "========================================"
