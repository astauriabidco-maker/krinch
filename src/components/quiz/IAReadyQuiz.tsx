"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, BrainCircuit, Rocket } from "lucide-react";
import LeadCaptureModal from "./LeadCaptureModal";
import { submitLeadAction } from "@/actions/index";

interface QuizOption {
    label: string;
    points: number;
}

interface QuizQuestion {
    text: string;
    options: QuizOption[];
}

interface IAReadyQuizProps {
    dict: Record<string, unknown>;
    locale: string;
}

export default function IAReadyQuiz({ dict, locale }: IAReadyQuizProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);

    const quizDict = dict.quiz as Record<string, unknown>;
    const questions = quizDict.questions as QuizQuestion[];
    const totalQuestions = questions.length;

    const handleAnswer = (points: number) => {
        const newAnswers = [...answers, points];
        setAnswers(newAnswers);
        if (currentStep < totalQuestions) {
            setCurrentStep(currentStep + 1);
        }
    };

    useEffect(() => {
        if (currentStep === totalQuestions + 1) {
            const totalPoints = answers.reduce((acc, curr) => acc + curr, 0);
            const maxPoints = totalQuestions * 10;
            setScore(Math.round((totalPoints / maxPoints) * 100));
        }
    }, [currentStep, answers, totalQuestions]);

    const getResultInfo = () => {
        const results = quizDict.results as Record<string, Record<string, string>>;
        if (score <= 40) return results.discovery;
        if (score <= 75) return results.transition;
        return results.pioneer;
    };

    const currentQuestion = questions[currentStep - 1];
    const progress = (currentStep / totalQuestions) * 100;

    const handleLeadSubmit = async (data: { name: string; email: string; company: string; score: number }) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('company', data.company);
        formData.append('score', String(data.score));
        formData.append('answers', JSON.stringify(answers));
        formData.append('serviceInterest', 'IA');
        await submitLeadAction(formData);
    };

    return (
        <div className="bg-[#f8faff] min-h-[500px] flex items-center justify-center py-20 px-6">
            <div className="max-w-3xl w-full bg-white shadow-2xl border border-gray-100 p-8 md:p-16 relative overflow-hidden">

                {currentStep > 0 && currentStep <= totalQuestions && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-secondary"
                        />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                                <BrainCircuit className="text-secondary w-10 h-10" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif text-primary mb-8 italic">
                                {quizDict.title as string}
                            </h1>
                            <p className="text-primary/60 text-lg mb-12 font-sans max-w-xl mx-auto">
                                {quizDict.subtitle as string}
                            </p>
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="bg-primary text-secondary px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-primary transition-all flex items-center gap-4 mx-auto"
                            >
                                {quizDict.start as string}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}

                    {currentStep > 0 && currentStep <= totalQuestions && (
                        <motion.div
                            key={`q-${currentStep}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12"
                        >
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
                                    Question {currentStep} / {totalQuestions}
                                </span>
                                <span className="text-primary/20 text-4xl font-serif">0{currentStep}</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-serif text-primary italic leading-tight">
                                {currentQuestion.text}
                            </h2>

                            <div className="grid gap-4">
                                {currentQuestion.options.map((option: QuizOption, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option.points)}
                                        className="group flex items-center justify-between p-6 bg-[#fcfcfc] border border-gray-100 text-left hover:border-secondary transition-all hover:bg-secondary/5 rounded-sm"
                                    >
                                        <span className="text-primary font-sans group-hover:text-secondary transition-colors">
                                            {option.label}
                                        </span>
                                        <div className="w-6 h-6 border border-primary/10 rounded-full flex items-center justify-center group-hover:border-secondary transition-colors">
                                            <div className="w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {currentStep > totalQuestions && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="mb-12">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary block mb-4">
                                    Votre Analyse Personnalisée
                                </span>
                                <div className="text-6xl md:text-8xl font-serif text-primary mb-6">
                                    {score}%
                                </div>
                                <h2 className="text-2xl md:text-3xl font-serif text-secondary italic mb-6">
                                    {getResultInfo().label}
                                </h2>
                                <p className="text-primary/70 max-w-xl mx-auto leading-relaxed mb-12">
                                    {getResultInfo().text}
                                </p>
                            </div>

                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-primary text-secondary px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-primary transition-all flex items-center gap-4 mx-auto shadow-2xl"
                            >
                                {(quizDict.results as Record<string, string>).cta}
                                <Rocket className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <LeadCaptureModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleLeadSubmit}
                dict={quizDict.results as Record<string, unknown>}
                score={score}
            />
        </div>
    );
}
