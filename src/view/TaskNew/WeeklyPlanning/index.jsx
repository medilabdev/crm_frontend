/**
 * Weekly Planning Main Container
 * Entry point component that coordinates all weekly planning functionality
 */

import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

// Layout components (following existing pattern)
import Topbar from '../../../components/Template/Topbar';
import Sidebar from '../../../components/Template/Sidebar';
import Main from '../../../components/Template/Main';

// Feature components
import WeeklyPlanningHeader from './components/WeeklyPlanningHeader';
import WeeklyPlanningGrid from './components/WeeklyPlanningGrid';
import CalculationStats from './components/CalculationStats';

// Custom hooks
import { useWeeklyPlanningAPI } from './hooks/useWeeklyPlanningAPI';
import { useWeeklyPlanningState } from './hooks/useWeeklyPlanningState';
import { useCalculations } from './hooks/useCalculations';

/**
 * Main Weekly Planning Component
 */
const WeeklyPlanning = () => {
  // Local UI state
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [currentPlanningUid, setCurrentPlanningUid] = useState(null);

  // API hooks
  const {
    branches,
    weeklyPlanMasters,
    loading,
    error,
    loadBranches,
    loadWeeklyPlanMasters,
    createWeeklyPlanning,
    loadWeeklyPlanning
  } = useWeeklyPlanningAPI();

  // State management hook
  const {
    planningData,
    setPlanningData,
    updateWeekData,
    updateDayData,
    addPlanningDetail,
    updatePlanningDetail,
    deletePlanningDetail,
    addOutsideDetail,
    updateOutsideDetail,
    deleteOutsideDetail
  } = useWeeklyPlanningState();

  // Calculations hook
  const {
    getDashboardStats,
    hasSignificantData
  } = useCalculations(planningData);

  /**
   * Initialize component - load initial data
   */
  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([
          loadBranches(),
          loadWeeklyPlanMasters()
        ]);
      } catch (error) {
        console.error('Failed to initialize weekly planning:', error);
      }
    };

    initializeData();
  }, [loadBranches, loadWeeklyPlanMasters]);

  /**
   * Load planning data when branch or month changes
   */
  useEffect(() => {
    if (selectedBranch) {
      handleLoadOrCreatePlanning();
    }
  }, [selectedBranch, selectedMonth]);

  /**
   * Handle loading or creating planning for selected month/branch
   */
  const handleLoadOrCreatePlanning = async () => {
    if (!selectedBranch) return;

    try {
      // Try to load existing planning first
      const plannings = await loadWeeklyPlanning({
        branch_uid: selectedBranch.value,
        week_start_date: selectedMonth.toISOString().split('T')[0]
      });

      if (plannings.data && plannings.data.length > 0) {
        // Load existing planning
        const planning = plannings.data[0];
        setPlanningData(planning);
        setCurrentPlanningUid(planning.uid);
      } else {
        // No existing planning, will show create form
        setPlanningData(null);
        setCurrentPlanningUid(null);
      }
    } catch (error) {
      console.error('Failed to load planning:', error);
    }
  };

  /**
   * Handle creating new planning
   */
  const handleCreatePlanning = async (planningFormData) => {
    try {
      const newPlanning = await createWeeklyPlanning({
        ...planningFormData,
        branch_uid: selectedBranch.value
      });

      if (newPlanning.status === 'success') {
        setPlanningData(newPlanning.data);
        setCurrentPlanningUid(newPlanning.data.uid);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to create planning:', error);
      return false;
    }
  };

  /**
   * Handle branch selection change
   */
  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption);
    // Reset current planning when branch changes
    setPlanningData(null);
    setCurrentPlanningUid(null);
  };

  /**
   * Handle month selection change
   */
  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    // Reset current planning when month changes
    setPlanningData(null);
    setCurrentPlanningUid(null);
  };

  /**
   * Render error state
   */
  if (error) {
    return (
      <>
        <Topbar />
        <div className="d-flex">
          <Sidebar />
          <Main>
            <Container fluid>
              <Alert variant="danger" className="mt-3">
                <Alert.Heading>Error Loading Weekly Planning</Alert.Heading>
                <p>{error}</p>
              </Alert>
            </Container>
          </Main>
        </div>
      </>
    );
  }

  /**
   * Main render
   */
  return (
    <>
      <Topbar />
      <div className="d-flex">
        <Sidebar />
        <Main>
          <Container fluid className="p-4">
            {/* Page Header */}
            <Row className="mb-4">
              <Col>
                <h2 className="mb-0">Weekly Planning</h2>
                <p className="text-muted">Manage your weekly planning and track performance</p>
              </Col>
            </Row>

            {/* Header Controls */}
            <WeeklyPlanningHeader
              selectedBranch={selectedBranch}
              selectedMonth={selectedMonth}
              branches={branches}
              weeklyPlanMasters={weeklyPlanMasters}
              onBranchChange={handleBranchChange}
              onMonthChange={handleMonthChange}
              onCreatePlanning={handleCreatePlanning}
              loading={loading}
              hasExistingPlanning={!!currentPlanningUid}
            />

            {/* Statistics Dashboard */}
            {hasSignificantData && (
              <Row className="mb-4">
                <Col>
                  <CalculationStats 
                    dashboardStats={getDashboardStats}
                    planningData={planningData}
                  />
                </Col>
              </Row>
            )}

            {/* Main Planning Grid */}
            {currentPlanningUid ? (
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <WeeklyPlanningGrid
                        planningData={planningData}
                        planningUid={currentPlanningUid}
                        onUpdateWeek={updateWeekData}
                        onUpdateDay={updateDayData}
                        onAddPlanningDetail={addPlanningDetail}
                        onUpdatePlanningDetail={updatePlanningDetail}
                        onDeletePlanningDetail={deletePlanningDetail}
                        onAddOutsideDetail={addOutsideDetail}
                        onUpdateOutsideDetail={updateOutsideDetail}
                        onDeleteOutsideDetail={deleteOutsideDetail}
                        weeklyPlanMasters={weeklyPlanMasters}
                        loading={loading}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ) : (
              /* No Planning Selected State */
              <Row>
                <Col>
                  <Card>
                    <Card.Body className="text-center py-5">
                      {loading ? (
                        <>
                          <Spinner animation="border" className="mb-3" />
                          <p className="text-muted">Loading planning data...</p>
                        </>
                      ) : (
                        <>
                          <h4 className="text-muted mb-3">No Planning Selected</h4>
                          <p className="text-muted">
                            {selectedBranch 
                              ? 'Select a month and create planning to get started'
                              : 'Select a branch to view or create weekly planning'
                            }
                          </p>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Container>
        </Main>
      </div>
    </>
  );
};

export default WeeklyPlanning;
