using Microsoft.Extensions.Logging;

namespace Backend.Tests.Mocks;

public class ListLogger<T> : ILogger<T>
{
    public List<string> Messages { get; } = [];
    
    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
    {
        Messages.Add(formatter(state, exception));
    }

    public bool IsEnabled(LogLevel logLevel) => true;

    public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;
}