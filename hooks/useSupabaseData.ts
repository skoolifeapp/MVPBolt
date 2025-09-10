import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'Haute' | 'Moyenne' | 'Basse';
  due_date: string | null;
  due_time: string | null;
  completed: boolean;
  category_color: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  size: string;
  category_color: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  description: string | null;
  color: string;
  event_date: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  transaction_date: string;
  category: string;
  type: 'income' | 'expense';
  category_color: string;
  bank_name: string;
  is_uncategorized: boolean;
  created_at: string;
  updated_at: string;
}

export const useLocalData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Simulation de données utilisateur locales
  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Simulation de données locales
      setTimeout(() => {
        setTasks([]);
        setDocuments([]);
        setEvents([]);
        setTransactions([]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  // Opérations sur les tâches (stockage local)
  const addTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    return { data: newTask, error: null };
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const updatedTask = { ...updates, updated_at: new Date().toISOString() };
    setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updatedTask } : task));
    return { data: updatedTask, error: null };
  };

  const deleteTask = async (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    return { error: null };
  };

  // Opérations sur les documents (stockage local)
  const addDocument = async (docData: Omit<Document, 'id' | 'created_at' | 'updated_at'>) => {
    const newDoc = {
      ...docData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setDocuments(prev => [newDoc, ...prev]);
    return { data: newDoc, error: null };
  };

  const deleteDocument = async (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    return { error: null };
  };

  // Opérations sur les événements (stockage local)
  const addEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setEvents(prev => [...prev, newEvent].sort((a, b) => 
      new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    ));
    return { data: newEvent, error: null };
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    const updatedEvent = { ...updates, updated_at: new Date().toISOString() };
    setEvents(prev => prev.map(event => event.id === id ? { ...event, ...updatedEvent } : event)
      .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()));
    return { data: updatedEvent, error: null };
  };

  const deleteEvent = async (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    return { error: null };
  };

  // Opérations sur les transactions (stockage local)
  const addTransaction = async (transactionData: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
    const newTransaction = {
      ...transactionData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return { data: newTransaction, error: null };
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    const updatedTransaction = { ...updates, updated_at: new Date().toISOString() };
    setTransactions(prev => prev.map(transaction => transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction));
    return { data: updatedTransaction, error: null };
  };

  // Charger les données au démarrage
  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    // Données
    tasks,
    documents,
    events,
    transactions,
    loading,
    
    // Opérations
    addTask,
    updateTask,
    deleteTask,
    addDocument,
    deleteDocument,
    addEvent,
    updateEvent,
    deleteEvent,
    addTransaction,
    updateTransaction,
    
    // Actualisation
    refetch: fetchUserData,
  };
};